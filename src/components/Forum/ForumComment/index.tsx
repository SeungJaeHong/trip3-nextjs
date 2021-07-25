import Link from 'next/link'
import styles from './ForumComment.module.scss'
import {Comment} from "../../../types"
import ReactMarkdown from "react-markdown"
import UserAvatar from "../../User/UserAvatar"

const ForumComment = (item: Comment) => {
    return (
        <div className={styles.ForumComment}>
            <div className={styles.MetaData}>
                <Link href={'/'}>
                    <a className={styles.User}>{item.user.name}</a>
                </Link>
                <div className={styles.CreatedDate}>
                    {item.createdAt}
                </div>
                <div className={styles.UserAvatar}>
                    <UserAvatar {...item.user} />
                </div>
            </div>
            <div className={styles.Body}>
                <ReactMarkdown>{item.body}</ReactMarkdown>
            </div>
        </div>
    )
}

export default ForumComment