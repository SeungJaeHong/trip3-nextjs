import Link from 'next/link'
import styles from './AdminHiddenContentForumRow.module.scss'
import clsx from "clsx"
import {ForumRowHiddenType} from "../../../../types";

const AdminHiddenContentForumRow = (item: ForumRowHiddenType) => {
    const getForumTypeName = (type: string) => {
        switch(type) {
            case 'buysell':
                return 'Ost-müük'
            case 'expat':
                return 'Elu välismaal'
            case 'misc':
                return 'Vaba teema'
            case 'internal':
                return 'Toimetuse foorum'
            case 'forum':
                return 'Üldfoorum'
            default: return ''
        }
    }

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
                        {item.createdAt}
                    </span>
                    <span className={clsx(styles.MetaItem, styles.ForumType)}>
                        {getForumTypeName(item.type)}
                    </span>
                    <span className={clsx(styles.MetaItem, styles.Creator)}>
                        <Link href={'/user/' + item.userId} >
                            <a>{item.userName}</a>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AdminHiddenContentForumRow