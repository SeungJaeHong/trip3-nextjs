import {Content} from "../../../types"
import React, {Fragment, useEffect, useState} from "react"
import {useRouter} from 'next/router'
import Header from "../../Header";
import styles from "./ForumShowPage.module.scss"
import containerStyle from "../../../styles/containers.module.scss"
import ForumPost from "../ForumPost"
import MoreLink from "../../MoreLink"
import ForumPostComments from "../ForumPostComments"
import Footer from "../../Footer"
import Button from "../../Button"
import {getForumUrlByType, getForumUrlByTypeAndSlug} from "../../../helpers"
import CommentEditor from "../../CommentEditor"
import BlockTitle from "../../BlockTitle"
import {postComment} from "../../../services/comment.service"
import {toast} from "react-hot-toast";
import {useAppSelector} from "../../../hooks";
import {selectUserIsLoggedIn} from "../../../redux/auth";

type Props = {
    post: Content,
    lastCommentId?: number
    currentPage: number,
    lastPage: number
}

const ForumShowPage = ({post, lastCommentId, currentPage, lastPage}: Props) => {
    const userIsLoggedIn = useAppSelector(selectUserIsLoggedIn)
    const [commentValue, setCommentValue] = useState('')
    const [comments, setComments] = useState(post.comments)
    const newestCommentUrl = lastCommentId ? getForumUrlByTypeAndSlug(post.type, post.slug) + '?page=' + lastPage + '&latest=1#' + lastCommentId : ''
    const [goToNewestLink, setGoToNewestLink] = useState(newestCommentUrl)
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()
    const {latest} = router.query

    useEffect(() => {
        setComments(post.comments)
    }, [post.comments])

    useEffect(() => {
        const hashId = window.location.hash?.replace('#', '');
        if (hashId) {
            const element = document.getElementById(hashId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                });
            }
        }
    }, [latest, comments])

    const onSubmit = async (value: string) => {
        setSubmitting(true)
        const res = await postComment(value, post.id).then((response) => {
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
            router.replace(url + '#' + comment.id)
            toast.success('Kommentaar lisatud', {
                duration: 4000
            })
            setSubmitting(false)
        }).catch(err => {
            setSubmitting(false)
            if (err.response?.status === 401) {
                toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                const url = getForumUrlByTypeAndSlug(post.type, post.slug)
                router.push(url)
            } else if(err.response?.status === 422 && err.response?.data?.errors ) {
                toast.error('Kommentaari sisu on kohustuslik!')
            } else {
                toast.error('Kommentaari lisamine ebaõnnestus')
            }
        })
    }

    return (
        <Fragment>
            <Header withBackgroundMap={true} className={styles.Header} />
            <div className={containerStyle.ContainerXl}>
                <div className={styles.Content}>
                    <div className={styles.ForumContent}>
                        <div className={styles.ForumPost}>
                            <ForumPost {...post} />
                        </div>
                        {goToNewestLink.length > 1 &&
                            <div className={styles.LatestCommentLink}>
                                <MoreLink
                                    route={goToNewestLink}
                                    title={'Mine uusima kommentaari juurde'} />
                            </div>
                        }
                        <ForumPostComments
                            post={post}
                            comments={comments}
                            currentPage={currentPage}
                            lastPage={lastPage} />

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
                        <div className={styles.SidebarButton}>
                            <Button title={'Otsi foorumist'} light={true} route={getForumUrlByType(post.type)} />
                        </div>
                        <div className={styles.SidebarButton}>
                            <Button title={'Alusta uut teemat'} light={true} route={'/'} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default ForumShowPage