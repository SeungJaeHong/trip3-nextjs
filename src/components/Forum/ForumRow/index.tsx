import Link from 'next/link'
import styles from './ForumRow.module.scss'
import clsx from "clsx"
import {Destination, ForumRowType, Topic} from "../../../types"
import Tag from "../../Tag";
import UserAvatar from "../../User/UserAvatar"

const ForumRow = (item: ForumRowType) => {
    return (
        <div className={styles.ForumRow}>
            <div className={styles.UserIcon}>
                <UserAvatar {...item.user} />
                <div className={clsx(styles.CommentCountContainer, {
                    [styles.CommentUnread]: item.isUnread
                })}>
                    <span className={styles.CommentCount}>{item.commentsCount}</span>
                </div>
            </div>
            <div className={styles.Content}>
                <Link href={'/'}>
                    <a>
                        <div className={styles.Title}>
                            {item.title}
                        </div>
                    </a>
                </Link>
                <div className={styles.Meta}>
                    <span className={styles.MetaItem}>
                        {item.updatedAt}
                    </span>
                    <span className={clsx(styles.MetaItem, styles.ReadCount)}>
                        Loetud {item.viewsCount} korda
                    </span>
                    <span className={clsx(styles.MetaItem, styles.Creator)}>
                        <Link href={'/'} >
                            <a>{item.user.name}</a>
                        </Link>
                    </span>
                    {item.destinations?.map((destination: Destination) => {
                        return (
                            <div className={clsx(styles.MetaItem, styles.Tag)} key={destination.id}>
                                <Tag title={destination.name} type={'destination'} route={'/'} />
                            </div>
                        )
                    })}
                    {item.topics?.map((topic: Topic) => {
                        return (
                            <div className={clsx(styles.MetaItem, styles.Tag)} key={topic.id}>
                                <Tag title={topic.name} route={'/'} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ForumRow