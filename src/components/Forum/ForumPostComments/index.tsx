import styles from './ForumPostComments.module.scss'
import {Comment} from "../../../types"
import ForumComment from "../ForumComment"

type Props = {
    comments?: Comment[]
}

const ForumPostComments = (props: Props) => {
    return (
        <div className={styles.ForumPostComments}>
            {props.comments?.map((item: Comment) => {
                return (
                    <div className={styles.CommentRow} key={item.id}>
                        <ForumComment {...item} />
                    </div>
                )
            })}
        </div>
    )
}

export default ForumPostComments