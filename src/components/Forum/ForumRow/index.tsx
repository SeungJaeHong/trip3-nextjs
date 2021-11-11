import Link from 'next/link'
import styles from './ForumRow.module.scss'
import clsx from "clsx"
import {Destination, ForumRowType, Topic} from "../../../types"
import Tag from "../../Tag";
import UserAvatar from "../../User/UserAvatar"

const ForumRow = (item: ForumRowType) => {
    const renderUnreadContentTags = () => {
        if (item.isNew) {
            return (
                <span className={styles.MetaItem}>
                    <Tag title={'Uus teema'} route={item.url} red={true} />
                </span>
            )
        } else if (item.unreadCommentsCount && item.unreadCommentsCount > 0) {
            const suffix = item.unreadCommentsCount === 1 ? 'uus' : 'uut'
            return (
                <span className={styles.MetaItem}>
                    <Tag title={item.unreadCommentsCount + ' ' + suffix} route={'/'} red={true} />
                </span>
            )
        }

        return null
    }

    return (
        <div className={styles.ForumRow}>
            <div className={styles.UserIcon}>
                <UserAvatar user={item.user} />
                <div className={styles.CommentCountContainer}>
                    <span className={styles.CommentCount}>{item.commentsCount}</span>
                </div>
            </div>
            <div className={styles.Content}>
                <Link href={item.url}>
                    <a>
                        <span className={styles.Title}>
                            {item.title}
                        </span>
                    </a>
                </Link>
                <div className={styles.Meta}>
                    {renderUnreadContentTags()}
                    <span className={styles.MetaItem}>
                        {item.updatedAt}
                    </span>
                    {item.viewsCount >= 25 &&
                        <span className={clsx(styles.MetaItem, styles.ReadCount)}>
                            Loetud {item.viewsCount} korda
                        </span>
                    }
                    <span className={clsx(styles.MetaItem, styles.Creator)}>
                        <Link href={'/'} >
                            <a>{item.user.name}</a>
                        </Link>
                    </span>
                    {item.destinations?.map((destination: Destination) => {
                        return (
                            <div className={clsx(styles.MetaItem, styles.Tag)} key={destination.id}>
                                <Tag title={destination.name} type={'destination'} route={'/sihtkoht/' + destination.slug} />
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