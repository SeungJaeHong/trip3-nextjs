import {useEffect, useState} from "react";
import styles from './ForumPostComments.module.scss'
import {Comment, Content} from "../../../types"
import ForumComment from "../ForumComment"
import PagePaginator from "../../Paginator/PagePaginator"
import {getForumUrlByTypeAndSlug} from "../../../helpers"
import clsx from "clsx"
import {useAppSelector} from "../../../hooks";
import {selectUserIsLoggedIn} from "../../../redux/auth";
import {rateComment, toggleCommentStatus} from "../../../services/forum.service";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";

type Props = {
    post: Content,
    comments?: Comment[],
    currentPage: number,
    lastPage: number
}

const ForumPostComments = (props: Props) => {
    const [comments, setComments] = useState(props.comments)
    const url = getForumUrlByTypeAndSlug(props.post.type, props.post.slug)
    const userIsLoggedIn = useAppSelector(selectUserIsLoggedIn)
    const router = useRouter()

    useEffect(() => {
        setComments(props.comments)
    }, [props.comments])

    const onThumbsClick = (item: Comment, type: boolean) => {
        if (userIsLoggedIn && comments?.length) {
            rateComment(props.post.id, item.id, type).then(res => {
                const index = comments.findIndex(x => x.id == item.id)
                const newComments = [...comments]
                newComments[index] = res.data
                setComments(newComments)
            }).catch(err => {

            })
        }
    }

    const onToggleStatus = (item: Comment) => {
        if (userIsLoggedIn && comments?.length) {
            toggleCommentStatus(props.post.id, item.id, item.status !== 1).then(res => {
                const index = comments.findIndex(x => x.id == item.id)
                const newComments = [...comments]
                newComments[index] = res.data
                setComments(newComments)
                toast.success(res.data.status === 1 ? 'Kommentaar avalikustatud' : 'Kommentaar peidetud')
            }).catch(err => {
                if (err.response?.status === 401) {
                    toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                    router.push(url)
                }
            })
        }
    }

    return (
        <div className={styles.ForumPostComments}>
            <div className={styles.Paginator}>
                <PagePaginator
                    currentPage={props.currentPage}
                    lastPage={props.lastPage}
                    baseUrl={url} />
            </div>
            {comments?.map((item: Comment) => {
                return (
                    <div className={styles.CommentRow} key={item.id} id={item.id.toString()}>
                        <ForumComment
                            item={item}
                            onThumbsClick={onThumbsClick}
                            onToggleStatus={onToggleStatus} />
                    </div>
                )
            })}
            <div className={clsx(styles.Paginator, styles.Bottom)}>
                <PagePaginator
                    currentPage={props.currentPage}
                    lastPage={props.lastPage}
                    baseUrl={url} />
            </div>
        </div>
    )
}

export default ForumPostComments