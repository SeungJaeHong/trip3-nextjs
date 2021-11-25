import Link from 'next/link'
import Image from 'next/image'
import styles from './NewsRow.module.scss'
import {Destination, NewsRowType, Topic} from "../../../types"
import Tag from "../../Tag";
import React from "react";

const NewsRow = (item: NewsRowType) => {
    return (
        <div className={styles.NewsRow}>
            <Link href={'/uudised/' + item.slug}>
                <a className={styles.Image}>
                    <Image
                        src={item.imageUrl ?? '/images/no_image.jpeg'}
                        alt={item.title}
                        width={180}
                        height={100}
                    />
                </a>
            </Link>
            <div className={styles.Content}>
                <div className={styles.Body}>
                    <Link href={'/uudised/' + item.slug}>
                        <a className={styles.Title}>
                            {item.title}
                        </a>
                    </Link>
                    <div className={styles.Tags}>
                        {item.destinations?.map((destination: Destination) => {
                            return <Tag title={destination.name} type={'destination'} route={'/sihtkoht/' + destination.slug} key={destination.id} />
                        })}
                        {item.topics?.map((topic: Topic) => {
                            return <Tag title={topic.name} key={topic.id} />
                        })}
                    </div>
                </div>
                <div className={styles.CreatedAt}>
                    {item.createdAt}
                </div>
            </div>
        </div>
    )
}

export default NewsRow