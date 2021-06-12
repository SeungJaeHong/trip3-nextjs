import Link from 'next/link'
import Image from 'next/image'
import styles from './NewsCard.module.scss'

const NewsCard = (props: any) => {
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
                        Tai meelitab turiste Phuketile tagasi 1$ hotellitubadega
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default NewsCard