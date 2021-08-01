import styles from './ForumPostComments.module.scss'
import {Comment, Content} from "../../../types"
import ForumComment from "../ForumComment"
import PagePaginator from "../../Paginator/PagePaginator"
import {getForumUrlByTypeAndSlug} from "../../../helpers"
import clsx from "clsx"

type Props = {
    post: Content,
    comments?: Comment[],
    currentPage: number,
    lastPage: number
}

const ForumPostComments = (props: Props) => {
    const url = getForumUrlByTypeAndSlug(props.post.type, props.post.slug)
    return (
        <div className={styles.ForumPostComments}>
            <div className={styles.Paginator}>
                <PagePaginator
                    currentPage={props.currentPage}
                    lastPage={props.lastPage}
                    baseUrl={url} />
            </div>
            {props.comments?.map((item: Comment) => {
                return (
                    <div className={styles.CommentRow} key={item.id}>
                        <ForumComment {...item} />
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