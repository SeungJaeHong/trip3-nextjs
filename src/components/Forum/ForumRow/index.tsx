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
                    {item.isNew &&
                        <span className={styles.MetaItem}>
                            <Tag title={'Uus teema'} route={'/'} red={true} />
                        </span>
                    }
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