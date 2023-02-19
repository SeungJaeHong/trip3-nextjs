import React, {Fragment, useEffect, useState} from 'react'
import { GetServerSideProps } from 'next'
import {Comment, ContentMarketingPost, Destination, NewsContent, Topic} from '../../../types'
import Header from '../../../components/Header'
import styles from './NewsPage.module.scss'
import containerStyle from '../../../styles/containers.module.scss'
import Tag from '../../../components/Tag'
import clsx from 'clsx'
import UserAvatar from '../../../components/User/UserAvatar'
import Footer from '../../../components/Footer'
import ForumComment from '../../../components/Forum/ForumComment'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import { publishNews } from '../../../services/news.service'
import {useIsMounted, useUser} from '../../../hooks'
import BlockTitle from '../../../components/BlockTitle'
import CommentEditor from '../../../components/CommentEditor'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Alert from '../../../components/Alert'
import { postComment } from '../../../services/comment.service'
import RelatedContentBlock from '../../../components/RelatedContentBlock'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import ContentMarketingSlider from "../../../components/ContentMarketing/Slider/ContentMarketingSlider";
import {getContentMarketingPosts} from "../../../services/flight.service";

const Ads = dynamic(() => import('../../../components/Ads'), { ssr: false })

type Props = {
    newsObj: NewsContent
}

const NewsShow = ({ newsObj }: Props) => {
    const [news, setNews] = useState<NewsContent>(newsObj)
    const [comments, setComments] = useState<Comment[] | undefined>(newsObj.comments)
    const [contentMarketingPosts, setContentMarketingPosts] = useState<ContentMarketingPost[]>([])
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [commentValue, setCommentValue] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const router = useRouter()
    const isMounted = useIsMounted()

    useEffect(() => {
        getContentMarketingPosts().then(res => {
            if (isMounted()) {
                setContentMarketingPosts(res.data)
            }
        }).catch(e => {

        })
    }, [newsObj])

    const onSubmit = async (value: string) => {
        setSubmitting(true)
        await postComment(value, news.id, 'news')
            .then((response) => {
                setCommentValue(value)
                setCommentValue('')
                const comment = response.data
                const newComments = comments ? [...comments, comment] : [comment]
                setComments(newComments)
                router.replace('/uudised/' + news.slug + '#' + comment.id)
                toast.success('Kommentaar lisatud')
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                    router.push('/uudised/' + news.slug)
                } else if (err.response?.status === 422 && err.response?.data?.errors) {
                    toast.error('Kommentaari sisu on kohustuslik!')
                } else {
                    toast.error('Kommentaari lisamine ebaõnnestus')
                }
            })
            .finally(() => setSubmitting(false))
    }

    const publish = (status: boolean) => {
        publishNews(news.id, status)
            .then((res) => {
                setNews({ ...news, status: status ? 1 : 0 })
                toast.success(status ? 'Uudis avalikustatud' : 'Uudis peidetud')
            })
            .catch((e) => {})
    }

    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | Uudised'}
                description={news.description}
                openGraph={{
                    title: news.title,
                    description: news.description,
                    images: [
                        {
                            url: news.socialImgUrl,
                            width: 1024,
                            height: undefined,
                            type: undefined,
                        },
                    ],
                }}
            />
            <Header backgroundImage={news.backgroundImageUrl ?? '/images/header.webp'}>
                <div className={clsx(containerStyle.CenteredContainer, styles.HeaderContainer)}>
                    <div className={styles.HeaderTitle}>{news.title}</div>
                    <div className={styles.DateAndUser}>
                        <a href={'/user/' + news.user.id} className={styles.Author}>
                            <div className={styles.User}>
                                <UserAvatar user={news.user} />
                            </div>
                            <div className={styles.UserName}>{news.user.name}</div>
                        </a>
                        <div className={styles.DateInfo}>{news.createdAt}</div>
                    </div>
                    <div className={styles.Tags}>
                        {news.destinations?.map((destination: Destination) => {
                            return (
                                <Tag
                                    title={destination.name}
                                    type={'destination'}
                                    route={'/sihtkoht/' + destination.slug}
                                    large={true}
                                    key={destination.id}
                                />
                            )
                        })}
                        {news.topics?.map((topic: Topic) => {
                            return <Tag title={topic.name} large={true} white={true} key={topic.id} />
                        })}
                    </div>
                    {userIsAdmin && (
                        <div className={styles.ActionButtons}>
                            <div
                                className={styles.ActionButton}
                                onClick={() => router.push('/uudised/' + news.id + '/muuda')}
                            >
                                Muuda
                            </div>
                            <div
                                className={styles.ActionButton}
                                onClick={() => publish(!Boolean(news.status))}
                            >
                                {news.status === 0 ? 'Avalikusta' : 'Peida'}
                            </div>
                        </div>
                    )}
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.BodyContainer}>
                    <div className={styles.BodyWithComments}>
                        {news.status === 0 && (
                            <div className={styles.NotPublished}>
                                <Alert title={'Uudis ei ole avalikustatud!'} type={'warning'} />
                            </div>
                        )}
                        <div className={styles.BodyWrapper}>
                            <Ads type={'desktop_body'} className={styles.DesktopTopAd} />
                            <Ads type={'mobile_320x200'} className={styles.MobileTopAd} />
                            <div className={styles.Body} dangerouslySetInnerHTML={{ __html: news.body }} />
                        </div>
                        <div className={styles.MobileAdBody}>
                            <Ads type={'mobile_320x200_2'} />
                        </div>
                        {comments && comments?.length > 0 && (
                            <div className={styles.Comments}>
                                {comments?.map((comment: Comment) => {
                                    return <ForumComment key={comment.id} item={comment} type={'news'} />
                                })}
                            </div>
                        )}
                        {userIsLoggedIn && (
                            <div className={styles.AddComment}>
                                <BlockTitle title={'Lisa kommentaar'} />
                                <CommentEditor
                                    id={'comment-editor'}
                                    onSubmit={onSubmit}
                                    value={commentValue}
                                    submitButtonName={'Lisa kommentaar'}
                                    submitting={submitting}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.Sidebar}>
                        {contentMarketingPosts.length > 0 && <div className={styles.ContentMarketingSlider}><ContentMarketingSlider posts={contentMarketingPosts} /></div>}
                        <div className={styles.Ads}>
                            <Ads type={'desktop_sidebar_small'} />
                            <Ads type={'desktop_sidebar_large'} />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedContentBlock type={'news'} ad={'mobile_320x200_3'} />
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const slug = context.query.id
        let url = process.env.API_BASE_URL + '/news/' + slug
        const response = await ApiClientSSR(context).get(url)

        return {
            props: {
                newsObj: response.data,
            },
        }
    } catch (e: any) {
        if (e?.response?.status === 500) {
            return {
                redirect: {
                    destination: '/500',
                    permanent: false,
                },
            }
        } else {
            return {
                notFound: true,
            }
        }
    }
}

export default NewsShow
