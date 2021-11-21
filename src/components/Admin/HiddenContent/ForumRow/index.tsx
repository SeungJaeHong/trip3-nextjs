import Link from 'next/link'
import styles from './AdminHiddenContentForumRow.module.scss'
import clsx from "clsx"
import {ForumRowHiddenType} from "../../../../types";

const AdminHiddenContentForumRow = (item: ForumRowHiddenType) => {
    return (
        <div className={styles.ForumRow}>
            <div className={styles.Content}>
                <Link href={item.url}>
                    <a>
                        <span className={styles.Title}>
                            {item.title}
                        </span>
                    </a>
                </Link>
                <div className={styles.Meta}>
                    <span className={styles.MetaItem}>
                        {item.updatedAt}
                    </span>
                    <span className={clsx(styles.MetaItem, styles.Creator)}>
                        <Link href={'/'} >
                            <a>user name</a>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AdminHiddenContentForumRow