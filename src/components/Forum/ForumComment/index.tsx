import Link from 'next/link'
import styles from './ForumComment.module.scss'
import {Comment} from "../../../types"
import ReactMarkdown from "react-markdown"
import UserAvatar from "../../User/UserAvatar"
import ThumbsUpIcon from "../../../icons/ThumbsUpIcon";
import ThumbsDownIcon from "../../../icons/ThumbsDownIcon";
import clsx from "clsx";

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
                <ReactMarkdown linkTarget={'_blank'} children={item.body} />
            </div>
            <div className={styles.Actions}>
                <div className={styles.Buttons}>
                    <span className={styles.ActionButton}>Muuda</span>/
                    <span className={styles.ActionButton}>Peida</span>
                </div>
                <div className={styles.Thumbs}>
                    <div className={styles.Thumb}>
                        <ThumbsUpIcon />
                        <span className={styles.ThumbsCount}>{item.likes}</span>
                    </div>
                    <div className={clsx(styles.Thumb, styles.ThumbDown)}>
                        <ThumbsDownIcon />
                        <span className={styles.ThumbsCount}>{item.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumComment