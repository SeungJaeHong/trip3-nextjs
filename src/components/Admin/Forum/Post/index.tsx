import styles from "./AdminForumPost.module.scss"
import React, {useEffect, useState} from "react";
import {getForumPostData} from "../../../../services/admin.service";
import {Comment, Content} from "../../../../types";
import {useRouter} from "next/router"
import LoadingSpinner2 from "../../../LoadingSpinner2"
import ForumPost from "../../../Forum/ForumPost";
import {AxiosResponse} from "axios";
import ForumPostComments from "../../../Forum/ForumPostComments";
import BlockTitle from "../../../BlockTitle";
import CommentEditor from "../../../CommentEditor";
import {postComment} from "../../../../services/comment.service";
import {toast} from "react-hot-toast";
import clsx from "clsx";
import MoreLink from "../../../MoreLink";

type ForumResponse = {
    post: Content
    lastCommentId: number
    lastPage: number
}

const AdminForumPost = () => {
    const router = useRouter()
    const [post, setPost] = useState<Content>()
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [lastPage, setLastPage] = useState<number>(1)
    const page = Number(router.query?.page) || 1
    const {id} = router.query
    const [commentValue, setCommentValue] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [latestCommentLink, setLatestCommentLink] = useState('')

    const scrollToHash = () => {
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
    }

    useEffect(() => {
        try {
            setLoading(true)
            const res = getForumPostData(Number(id), page).then((response: AxiosResponse<ForumResponse>) => {
                const forumPost = response.data.post
                setPost(forumPost)
                setComments(forumPost?.comments || [])
                setLastPage(response.data.lastPage)
                if (comments && comments.length > 0) {
                    setLatestCommentLink('/admin/forum/' + forumPost.id + '?page=' + response.data.lastPage + '#' + forumPost.id)
                }
                setLoading(false)
                scrollToHash()
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [page])

    if (loading || !post) {
        return (
            <div className={styles.Loading}>
                <LoadingSpinner2 />
            </div>
        )
    }

    const onSubmitComment = async (value: string) => {
        setSubmitting(true)
        const res = await postComment(value, post.id).then((response) => {
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
            toast.success('Kommentaar lisatud', {
                duration: 4000
            })
            setSubmitting(false)
        }).catch(err => {
            setSubmitting(false)
            if (err.response?.status === 401) {
                toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                router.push('/login')
            } else if(err.response?.status === 422 && err.response?.data?.errors ) {
                toast.error('Kommentaari sisu on kohustuslik!')
            } else {
                toast.error('Kommentaari lisamine ebaõnnestus')
            }
        })
    }

    return (
        <div className={styles.AdminForumPost}>
            <div className={styles.ForumPost}>
                <ForumPost {...post} />
            </div>
            {latestCommentLink &&
                <div className={styles.LatestCommentLink}>
                    <MoreLink
                        route={latestCommentLink}
                        title={'Mine uusima kommentaari juurde'} />
                </div>
            }
            {comments.length > 0 &&
                <div className={styles.PostComments}>
                    <ForumPostComments
                        post={post}
                        comments={comments}
                        currentPage={page}
                        lastPage={lastPage} />
                </div>
            }
            <div className={clsx(styles.AddComment, {
                [styles.NoComments]: comments.length === 0
            })}>
                <BlockTitle title={'Lisa kommentaar'} />
                <CommentEditor
                    id={'comment-editor'}
                    onSubmit={onSubmitComment}
                    value={commentValue}
                    submitButtonName={'Lisa kommentaar'}
                    submitting={submitting} />
            </div>
        </div>
    )
}

export default AdminForumPost