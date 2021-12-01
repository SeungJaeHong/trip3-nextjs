import React, {Fragment, useState} from 'react'
import {GetServerSideProps} from 'next'
import {Comment, Destination, NewsContent, Topic} from "../../types"
import Header from "../../components/Header"
import styles from "./NewsPage.module.scss"
import containerStyle from "../../styles/containers.module.scss"
import Tag from "../../components/Tag"
import clsx from "clsx"
import Button from "../../components/Button"
import UserAvatar from "../../components/User/UserAvatar";
import Footer from "../../components/Footer";
import ForumComment from "../../components/Forum/ForumComment";
import ApiClientSSR from "../../lib/ApiClientSSR";
import {postComment} from "../../services/news.service";
import useUser from "../../hooks";
import BlockTitle from "../../components/BlockTitle";
import CommentEditor from "../../components/CommentEditor";
import {toast} from "react-hot-toast";
import {useRouter} from 'next/router'

type Props = {
    news: NewsContent
}

const NewsShow = ({news}: Props) => {
    const [comments, setComments] = useState(news.comments)
    const { loggedIn, user } = useUser()
    const [commentValue, setCommentValue] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const onSubmit = async (value: string) => {
        setSubmitting(true)
        const res = await postComment(value, news.id).then((response) => {
            setCommentValue(value)
            setCommentValue('')
            const comment = response.data
            const newComments = comments ? [...comments, comment] : [comment]
            setComments(newComments)
            router.replace('/uudised/' + news.slug + '#' + comment.id)
            toast.success('Kommentaar lisatud', {
                duration: 4000
            })
            setSubmitting(false)
        }).catch(err => {
            setSubmitting(false)
            if (err.response?.status === 401) {
                toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                router.push('/uudised/' + news.slug)
            } else if(err.response?.status === 422 && err.response?.data?.errors ) {
                toast.error('Kommentaari sisu on kohustuslik!')
            } else {
                toast.error('Kommentaari lisamine ebaõnnestus')
            }
        })
    }

    return (
        <Fragment>
            <Header backgroundImage={news.backgroundImageUrl}>
                <div className={clsx(containerStyle.CenteredContainer, styles.HeaderContainer)}>
                    <div className={styles.HeaderTitle}>
                        {news.title}
                    </div>
                    <div className={styles.DateAndUser}>
                        <div className={styles.User}>
                            <UserAvatar user={news.user} />
                        </div>
                        <div className={styles.HeaderDate}>
                            {news.createdAt}
                        </div>
                    </div>
                    <div className={styles.Tags}>
                        {news.destinations?.map((destination: Destination) => {
                            return <Tag title={destination.name} type={'destination'} route={'/sihtkoht/' + destination.slug} large={true} key={destination.id} />
                        })}
                        {news.topics?.map((topic: Topic) => {
                            return <Tag title={topic.name} large={true} white={true} key={topic.id} />
                        })}
                    </div>
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.BodyContainer}>
                    <div className={styles.BodyWithComments}>
                        <div className={styles.Body} dangerouslySetInnerHTML={{ __html: news.body }} />
                        <div className={styles.Comments}>
                            {comments?.map((comment: Comment) => {
                                return (
                                    <ForumComment
                                        key={comment.id}
                                        item={comment}
                                        type={'news'} />
                                )
                            })}
                        </div>
                        {loggedIn &&
                            <div className={styles.AddComment}>
                                <BlockTitle title={'Lisa kommentaar'} />
                                <CommentEditor
                                    id={'comment-editor'}
                                    onSubmit={onSubmit}
                                    value={commentValue}
                                    submitButtonName={'Lisa kommentaar'}
                                    submitting={submitting} />
                            </div>
                        }
                    </div>
                    <div className={styles.SidebarShow}>
                        <div className={styles.AddNewNews}>
                            <Button title={'Lisa uus uudis'} route={'/'} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.query.slug
    let url = process.env.API_BASE_URL + '/news/' + slug

    const response = await ApiClientSSR(context).get(url)
    const data = {
        news: response.data.news,
    }

    return {
        props: data
    }
}

export default NewsShow