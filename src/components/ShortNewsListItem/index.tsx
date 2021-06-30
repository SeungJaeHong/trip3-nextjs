import Link from 'next/link'
import styles from './ShortNewsListItem.module.scss'
import {ShortNewsListItemType} from "../../types"

const ShortNewsListItem = (item: ShortNewsListItemType) => {
    return (
        <div className={styles.ShortNewsListItem}>
            <div className={styles.Dot} />
            <div className={styles.ShortNewsContent}>
                <div className={styles.Title}>
                    <Link href={'/'}>
                        <a>
                            {item.title}
                        </a>
                    </Link>
                </div>
                <div className={styles.Date}>
                    {item.createdAt}
                </div>
            </div>
        </div>
    )
}

export default ShortNewsListItem