import Link from 'next/link'
import styles from './ForumRow.module.scss'
import UserIcon from '../../../icons/UserIcon'
import clsx from "clsx";

const ForumRow = (props: any) => {
    return (
        <div className={styles.ForumRow}>
            <div className={styles.UserIcon}>
                <UserIcon />
                <div className={clsx(styles.CommentCountContainer, {
                    [styles.CommentUnread]: false
                })}>
                    <span className={styles.CommentCount}>14</span>
                </div>
            </div>
            <div className={styles.Content}>
                <Link href={'/'}>
                    <a>
                        <div className={styles.Title}>
                            Lorem Ipsum is simply dummy text of the printing
                        </div>
                    </a>
                </Link>
                <div className={styles.Meta}>
                    <span className={styles.MetaItem}>
                        Täna 13:21
                    </span>
                    <span className={clsx(styles.MetaItem, styles.ReadCount)}>
                        Loetud 347 korda
                    </span>
                    <span className={clsx(styles.MetaItem, styles.Creator)}>
                        <Link href={'/'} >
                            <a>SomeUser</a>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ForumRow