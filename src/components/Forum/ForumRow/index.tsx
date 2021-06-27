import Link from 'next/link'
import styles from './ForumRow.module.scss'
import UserIcon from '../../../icons/UserIcon'
import clsx from "clsx"
import {Destination, ForumRowItem} from "../../../types"
import Tag from "../../Tag";

const ForumRow = (item: ForumRowItem) => {
    return (
        <div className={styles.ForumRow}>
            <div className={styles.UserIcon}>
                <UserIcon />
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
                                <Tag title={'Hipaania'} type={'destination'} route={'/'} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ForumRow