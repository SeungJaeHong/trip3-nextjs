import { ForumPostType } from '../../../types'
import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../Header'
import styles from './ForumShowPage.module.scss'
import containerStyle from '../../../styles/containers.module.scss'
import ForumPost from '../ForumPost'
import MoreLink from '../../MoreLink'
import ForumPostComments from '../ForumPostComments'
import Footer from '../../Footer'
import Button from '../../Button'
import { getForumUrlByType, getForumUrlByTypeAndSlug, scrollToHash } from '../../../helpers'
import CommentEditor from '../../CommentEditor'
import BlockTitle from '../../BlockTitle'
import { postComment } from '../../../services/comment.service'
import { toast } from 'react-toastify'
import { useUser } from '../../../hooks'
import RelatedContentBlock from '../../RelatedContentBlock'
import clsx from 'clsx'
import Alert from '../../Alert'
import dynamic from "next/dynamic"
import {toggleCommentEnabled} from "../../../services/forum.service";

const Ads = dynamic(() => import('../../Ads'), { ssr: false })

type Props = {
    post: ForumPostType
    lastCommentId?: number
    currentPage: number
    lastPage: number
}

const ForumShowPage = ({ post, lastCommentId, currentPage, lastPage }: Props) => {
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [commentValue, setCommentValue] = useState<string>('')
    const [comments, setComments] = useState(post.comments)
    const newestCommentUrl = lastCommentId
        ? getForumUrlByTypeAndSlug(post.type, post.slug) + '?page=' + lastPage + '#' + lastCommentId
        : ''
    const [goToNewestLink, setGoToNewestLink] = useState(newestCommentUrl)
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [commentsDisabled, setCommentsDisabled] = useState<boolean>(post.commentsDisabled)
    const router = useRouter()

    useEffect(() => {
        setComments(post.comments)
    }, [post.comments])

    const onToggleCommentsEnabled = () => {
        toggleCommentEnabled(post, commentsDisabled)
            .then((res) => {
                setCommentsDisabled(res.data)
                toast.success('Kommenteerimine lubatud')
            })
            .catch((err) => {
                toast.error('Kommenteerimise muutmine ebaõnnestus')
            })
    }

    const getLastAd = () => {
        if (!comments)
            return undefined

        if (userIsLoggedIn && comments?.length >= 6 && comments?.length < 12) {
            return 'mobile_320x200_3'
        } else if (comments?.length <= 12) {
            return 'mobile_320x200_2'
        }

        return undefined
    }

    const getLastAd2 = () => {
        if (!comments)
            return undefined

        if (!userIsLoggedIn && comments?.length < 12) {
            return 'mobile_320x200_3'
        }

        return undefined
    }

    const onSubmit = async (value: string) => {
        setSubmitting(true)
        await postComment(value, post.id)
            .then((response) => {
                setCommentValue(value)
                setCommentValue('')
                const comment = response.data.comment
                const newLastPage = response.data.lastPage
                const newComments = comments ? [...comments, comment] : [comment]
                setComments(newComments)

                let url = getForumUrlByTypeAndSlug(post.type, post.slug)
                if (lastPage > 1) {
                    if (lastPage !== newLastPage) {
                        url += '?page=' + newLastPage
                    } else {
                        url += '?page=' + lastPage
                    }
                }

                setGoToNewestLink(url + '#' + comment.id)
                router.push(url + '#' + comment.id)
                toast.success('Kommentaar lisatud')
                setSubmitting(false)
            })
            .catch((err) => {
                setSubmitting(false)
                if (err.response?.status === 401) {
                    toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                    const url = getForumUrlByTypeAndSlug(post.type, post.slug)
                    router.push(url)
                } else if (err.response?.status === 422 && err.response?.data?.errors) {
                    toast.error('Kommentaari sisu on kohustuslik!')
                } else {
                    toast.error('Kommentaari lisamine ebaõnnestus')
                }
            })
    }

    useEffect(() => {
        setComments(post.comments)
    }, [post.comments])

    useEffect(() => {
        setTimeout(function () {
            scrollToHash()
        }, 0)
    }, [comments])

    return (
        <Fragment>
            <Header withBackgroundMap={true} className={styles.Header} />
            <div className={containerStyle.ContainerXl}>
                <div className={styles.Content}>
                    <div className={styles.ForumContent}>
                        <div className={styles.ForumPost}>
                            <ForumPost item={post} />
                        </div>
                        {goToNewestLink.length > 1 && (
                            <div
                                className={clsx(styles.LatestCommentLink, {
                                    [styles.HasPaginator]: lastPage > 1,
                                })}
                            >
                                <MoreLink route={goToNewestLink} title={'Mine uusima kommentaari juurde'} />
                            </div>
                        )}
                        <div className={styles.PostComments}>
                            <ForumPostComments
                                post={post}
                                comments={comments}
                                currentPage={currentPage}
                                lastPage={lastPage}
                            />
                        </div>
                        {userIsLoggedIn && (
                            <>
                                {commentsDisabled && (
                                    <div className={styles.LockedForComments}>
                                        <Alert
                                            type={'info'}
                                            title={
                                                'Postitus on olnud pikka aega mitteaktiivne. Teemasse kommenteerimine on suletud.'
                                            }
                                        />
                                        {(post.canEnableComments && userIsAdmin) &&
                                            <Button title={'Luba'} className={styles.EnableButton} onClick={onToggleCommentsEnabled} />
                                        }
                                    </div>
                                )}
                                {!commentsDisabled && (
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
                            </>
                        )}
                        <div className={styles.BodyAd}>
                            <Ads type={'desktop_body'} />
                        </div>
                        <div className={styles.BodyAdMobile}>
                            {comments && comments?.length < 6 &&
                                <Ads type={'mobile_320x200'} />
                            }
                            {userIsLoggedIn && comments && comments?.length >= 6 && comments?.length < 12 &&
                                <Ads type={'mobile_320x200_2'} />
                            }
                        </div>
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.SidebarButtons}>
                            <Button title={'Otsi foorumist'} light={true} route={getForumUrlByType(post.type)} />
                            {userIsLoggedIn && (
                                <Button title={'Alusta uut teemat'} light={true} route={'/foorum/lisa-uus'} />
                            )}
                        </div>
                        {comments && comments?.length >= 12 &&
                            <div className={styles.Ads}>
                                <Ads type={'mobile_320x200_3'} />
                            </div>
                        }
                        <div className={styles.Ads}>
                            <Ads type={'desktop_sidebar_small'} />
                            <Ads type={'desktop_sidebar_large'} />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedContentBlock
                type={'forum'}
                ad={getLastAd()}
                ad2={getLastAd2()} />
            <Footer />
        </Fragment>
    )
}

export default ForumShowPage
