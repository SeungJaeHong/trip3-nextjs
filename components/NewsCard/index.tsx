import Link from 'next/link'
import Image from 'next/image'
import styles from './NewsCard.module.scss'
import clsx from "clsx";

const NewsCard = (props: any) => {
    return (
        <div className={styles.NewsCard}>
            <div className={styles.Background}>
                <Image
                    src={"https://trip.ee/images/medium/Tai-rand-12_vq7f.jpeg"}
                    alt="Picture of the author"
                    width={350}
                    height={200}
                />
            </div>
        </div>
    )
}

export default NewsCard