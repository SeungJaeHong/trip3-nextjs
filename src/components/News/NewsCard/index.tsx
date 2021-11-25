import Link from 'next/link'
import Image from 'next/image'
import styles from './NewsCard.module.scss'
import {NewsCardType} from "../../../types"

const NewsCard = (item: NewsCardType) => {
    return (
        <div className={styles.NewsCard}>
            <Link href={'/uudised/' + item.slug}>
                <a>
                    <div className={styles.Background}>
                        <Image
                            src={item.imageUrl ?? '/images/no_image.jpeg'}
                            alt={item.title}
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