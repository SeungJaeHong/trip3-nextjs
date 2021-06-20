import Link from 'next/link'
import styles from './ShortNewsListItem.module.scss'

type Props = {
    title: string,
    date: string
}

const ShortNewsListItem = (props: Props) => {
    return (
        <div className={styles.ShortNewsListItem}>
            <div className={styles.Dot} />
            <div className={styles.ShortNewsContent}>
                <div className={styles.Title}>
                    <Link href={'/'}>
                        <a>
                            {props.title}
                        </a>
                    </Link>
                </div>
                <div className={styles.Date}>
                    {props.date}
                </div>
            </div>
        </div>
    )
}

export default ShortNewsListItem