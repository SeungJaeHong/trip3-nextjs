import styles from './AdminForumPost.module.scss'
import React, { useEffect, useState } from 'react'
import { getForumPostData } from '../../../../services/admin.service'
import { Comment, ForumPostType } from '../../../../types'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../../LoadingSpinner'
import ForumPost from '../../../Forum/ForumPost'
import { AxiosResponse } from 'axios'
import ForumPostComments from '../../../Forum/ForumPostComments'
import BlockTitle from '../../../BlockTitle'
import CommentEditor from '../../../CommentEditor'
import { postComment } from '../../../../services/comment.service'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import MoreLink from '../../../MoreLink'
import { scrollToHash } from '../../../../helpers'

type ForumResponse = {
    post: ForumPostType
    lastCommentId: number
    lastPage: number
}

const AdminForumPost = () => {
    const router = useRouter()
    const [post, setPost] = useState<ForumPostType>()
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [lastPage, setLastPage] = useState<number>(1)
    const page = Number(router.query?.page) || 1
    const { id } = router.query
    const [commentValue, setCommentValue] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [latestCommentLink, setLatestCommentLink] = useState<string>('')

    useEffect(() => {
        try {
            setLoading(true)
            getForumPostData(Number(id), page).then((response: AxiosResponse<ForumResponse>) => {
                const forumPost = response.data.post
                const lastCommentId = response.data.lastCommentId
                setPost(forumPost)
                const forumComments = forumPost?.comments || []
                setComments(forumComments)
                setLastPage(response.data.lastPage)
                if (forumComments && forumComments.length > 0) {
                    setLatestCommentLink(
                        '/admin/forum/' + forumPost.id + '?page=' + response.data.lastPage + '#' + lastCommentId
                    )
                }
                setLoading(false)
                scrollToHash()
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [page, id])

    if (loading || !post) {
        return (
            <div className={styles.Loading}>
                <LoadingSpinner />
            </div>
        )
    }

    const onSubmitComment = async (value: string) => {
        setSubmitting(true)
        await postComment(value, post.id)
            .then((response) => {
                setCommentValue(value)
                setCommentValue('')
                const comment = response.data.comment
                const lastPage = response.data.lastPage
                let url = '/admin/forum/' + post.id
                if (Number(lastPage) !== page) {
                    url += '?page=' + lastPage
                } else {
                    const newComments = comments ? [...comments, comment] : [comment]
                    setComments(newComments)
                }

                url = url + '#' + comment.id
                router.push(url)
                toast.success('Kommentaar lisatud')
                setSubmitting(false)
            })
            .catch((err) => {
                setSubmitting(false)
                if (err.response?.status === 401) {
                    toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                    router.push('/login')
                } else if (err.response?.status === 422 && err.response?.data?.errors) {
                    toast.error('Kommentaari sisu on kohustuslik!')
                } else {
                    toast.error('Kommentaari lisamine ebaõnnestus')
                }
            })
    }

    return (
        <div className={styles.AdminForumPost}>
            <div className={styles.ForumPost}>
                <ForumPost item={post} showBreadCrumbs={false} />
            </div>
            {latestCommentLink.length > 0 && (
                <div
                    className={clsx(styles.LatestCommentLink, {
                        [styles.HasPaginator]: lastPage > 1,
                    })}
                >
                    <MoreLink route={latestCommentLink} title={'Mine uusima kommentaari juurde'} />
                </div>
            )}
            {comments.length > 0 && (
                <div className={styles.PostComments}>
                    <ForumPostComments post={post} comments={comments} currentPage={page} lastPage={lastPage} />
                </div>
            )}
            <div
                className={clsx(styles.AddComment, {
                    [styles.NoComments]: comments.length === 0,
                })}
            >
                <BlockTitle title={'Lisa kommentaar'} />
                <CommentEditor
                    id={'comment-editor'}
                    onSubmit={onSubmitComment}
                    value={commentValue}
                    submitButtonName={'Lisa kommentaar'}
                    submitting={submitting}
                />
            </div>
        </div>
    )
}

export default AdminForumPost
