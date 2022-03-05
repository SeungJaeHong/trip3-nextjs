import React, { Fragment, useState } from 'react'
import Header from '../../../components/Header'
import { GetServerSideProps } from 'next'
import Footer from '../../../components/Footer'
import containerStyle from '../../../styles/containers.module.scss'
import styles from './TravelmatePage.module.scss'
import { Comment, Destination, Topic, TravelmateContent } from '../../../types'
import { useRouter } from 'next/router'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import Link from 'next/link'
import Tag from '../../../components/Tag'
import UserAvatar from '../../../components/User/UserAvatar'
import useUser from '../../../hooks'
import ForumComment from '../../../components/Forum/ForumComment'
import BlockTitle from '../../../components/BlockTitle'
import CommentEditor from '../../../components/CommentEditor'
import { postComment } from '../../../services/comment.service'
import { toast } from 'react-toastify'
import clsx from "clsx";

type Props = {
    content: TravelmateContent
}

const TravelmatePage = ({ content }: Props) => {
    const [commentValue, setCommentValue] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[] | undefined>(content.comments)
    const { userIsLoggedIn, user } = useUser()
    const userIsOwner = content.user.id === user?.id
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const router = useRouter()

    const onCommentSubmit = async (value: string) => {
        setSubmitting(true)
        await postComment(value, content.id, 'travelmate')
            .then((response) => {
                setCommentValue(value)
                setCommentValue('')
                const comment = response.data
                const newComments = comments ? [...comments, comment] : [comment]
                setComments(newComments)
                toast.success('Kommentaar lisatud')
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                } else if (err.response?.status === 422 && err.response?.data?.errors) {
                    toast.error('Kommentaari sisu on kohustuslik!')
                } else {
                    toast.error('Kommentaari lisamine ebaõnnestus')
                }
            })
            .finally(() => setSubmitting(false))
    }

    const hideTravelmate = () => {
        console.log('hide')
    }

    const renderAgeAndGender = () => {
        let value = undefined
        const gender = content.user.gender ? (content.user.gender === 1 ? 'M' : 'N') : undefined
        if (content.user.age && gender) {
            value = gender + ', ' + content.user.age
        } else if (content.user.age) {
            value = content.user.age
        } else if (gender) {
            value = gender
        }

        if (!value) {
            return null
        }

        return <div className={styles.UserAge}>({value})</div>
    }

    const renderActionButtons = () => {
        if (userIsAdmin) {
            return (
                <div className={styles.ActionButtons}>
                    <span className={styles.ActionButton} onClick={() => router.push('/reisikaaslased/' + content.id + '/muuda')}>Muuda</span>{' '}
                    /
                    <span className={styles.ActionButton} onClick={hideTravelmate}>Peida</span>
                </div>
            )
        } else if (userIsOwner) {
            return (
                <div className={styles.ActionButtons}>
                    <span className={styles.ActionButton} onClick={() => router.push('/reisikaaslased/' + content.id + '/muuda')}>Muuda</span>
                </div>
            )
        }

        return null
    }

    return (
        <Fragment>
            <Header>
                <div className={styles.PageTitleContainer}>
                    <div className={styles.PageTitle}>
                        Reisikaaslased
                        <Link href={'/reisikaaslased'}>
                            <a className={styles.MoreLink}>Vaata kõiki kuulutusi ›</a>
                        </Link>
                    </div>
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.PageContentContainer}>
                    <div className={styles.PageContent}>
                        <div className={styles.TravelmateTitle}>{content.title}</div>
                        <div className={styles.MetaData}>
                            <div className={styles.CreatedAt}>Lisatud {content.createdAt}</div>
                            <div className={styles.Tags}>
                                {content.destinations?.map((destination: Destination) => {
                                    return (
                                        <Tag
                                            title={destination.name}
                                            type={'destination'}
                                            route={'/sihtkoht/' + destination.slug}
                                            key={destination.id}
                                        />
                                    )
                                })}
                                {content.topics?.map((topic: Topic) => {
                                    return <Tag title={topic.name} key={topic.id} />
                                })}
                            </div>
                        </div>
                        <div className={clsx(styles.Body, {
                            [styles.WithBodyMargin]: !(userIsOwner || userIsAdmin)
                        })} dangerouslySetInnerHTML={{ __html: content.body }} />

                        {renderActionButtons()}

                        {comments && comments?.length > 0 && (
                            <div className={styles.Comments}>
                                {comments.map((comment: Comment) => {
                                    return <ForumComment key={comment.id} item={comment} type={'travelmate'} />
                                })}
                            </div>
                        )}

                        {userIsLoggedIn && (
                            <div className={styles.AddComment}>
                                <BlockTitle title={'Lisa kommentaar'} />
                                <CommentEditor
                                    id={'comment-editor'}
                                    onSubmit={onCommentSubmit}
                                    value={commentValue}
                                    submitButtonName={'Lisa kommentaar'}
                                    submitting={submitting}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.UserCard}>
                            <div className={styles.UserInfo}>
                                <div
                                    className={styles.UserAvatar}
                                    onClick={() => router.push('/user/' + content.user.id)}
                                >
                                    <UserAvatar user={content.user} />
                                </div>
                                <div className={styles.UserNameContainer}>
                                    <Link href={'/user/' + content.user.id}>
                                        <a className={styles.UserName}>{content.user.name}</a>
                                    </Link>
                                    {renderAgeAndGender()}
                                </div>
                            </div>
                            {userIsLoggedIn && content.user.id !== user?.id && (
                                <div
                                    className={styles.SendButton}
                                    onClick={() => router.push('/profile/messages/' + content.user.id)}
                                >
                                    Saada sõnum
                                </div>
                            )}
                        </div>
                        <div className={styles.InfoCard}>
                            <div className={styles.InfoBlock}>
                                <div className={styles.InfoQuestion}>Reisi algus</div>
                                <div className={styles.InfoAnswer}>Märts, 2016</div>
                            </div>
                            <div className={styles.InfoBlock}>
                                <div className={styles.InfoQuestion}>Reisi kestvus</div>
                                <div className={styles.InfoAnswer}>1 - 2 nädalat</div>
                            </div>
                            <div className={styles.InfoBlock}>
                                <div className={styles.InfoQuestion}>Millist kaaslast soovid leida?</div>
                                <div className={styles.InfoAnswer}>Kõik sobib</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const slug = context.query.slug
        const url = process.env.API_BASE_URL + '/travelmate/' + slug
        const response = await ApiClientSSR(context).get(url)
        return {
            props: {
                content: response.data,
            },
        }
    } catch (e) {
        return {
            notFound: true,
        }
    }
}

export default TravelmatePage
