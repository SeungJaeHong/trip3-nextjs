import React, {Fragment, useState} from 'react'
import Header from '../../../components/Header'
import { GetServerSideProps } from 'next'
import Footer from '../../../components/Footer'
import containerStyle from '../../../styles/containers.module.scss'
import styles from './TravelmatePage.module.scss'
import {Comment, Destination, Topic, TravelmateContent} from '../../../types'
import { useRouter } from 'next/router'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import Link from 'next/link'
import Tag from '../../../components/Tag'
import UserAvatar from '../../../components/User/UserAvatar'
import useUser from '../../../hooks'
import ForumComment from "../../../components/Forum/ForumComment";
import BlockTitle from "../../../components/BlockTitle";
import CommentEditor from "../../../components/CommentEditor";

type Props = {
    content: TravelmateContent
}

const TravelmatePage = ({ content }: Props) => {
    const [commentValue, setCommentValue] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[]|undefined>(content.comments)
    const { userIsLoggedIn, user } = useUser()
    const router = useRouter()

    const onSubmit = async (value: string) => {
        console.log(value)
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

        return (
            <div className={styles.UserAge}>({value})</div>
        )
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
                        <div className={styles.Body}>{content.body}</div>

                        {(comments && comments?.length > 0) &&
                            <div className={styles.Comments}>
                                {comments.map((comment: Comment) => {
                                    return (
                                        <ForumComment
                                            key={comment.id}
                                            item={comment}
                                            type={'travelmate'} />
                                    )
                                })}
                            </div>
                        }

                        {userIsLoggedIn &&
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
