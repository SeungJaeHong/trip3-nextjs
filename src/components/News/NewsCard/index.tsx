import Link from 'next/link'
import Image from 'next/image'
import styles from './NewsCard.module.scss'
import {NewsCardType} from "../../../types"

const NewsCard = (item: NewsCardType) => {
    return (
        <div className={styles.NewsCard}>
            <Link href={'/'}>
                <a>
                    <div className={styles.Background}>
                        <Image
                            src={"https://trip.ee/images/medium/Tai-rand-12_vq7f.jpeg"}
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className={styles.Title}>
                        {item.title} {item.commentsCount > 0 && <span className={styles.CommentCount}>({item.commentsCount})</span>}
                    </div>
                </a>
            </Link>
            <div className={styles.CreatedAt}>
                {item.createdAt}
            </div>
        </div>
    )
}

export default NewsCard