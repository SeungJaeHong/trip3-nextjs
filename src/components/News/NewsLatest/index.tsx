import styles from './NewsLatest.module.scss'
import BlockTitle from '../../BlockTitle'
import NewsCard from '../NewsCard'
import React, { useEffect, useState } from 'react'
import { NewsCardType } from '../../../types'
import MoreLink from '../../MoreLink'
import { getLatestNews } from '../../../services/news.service'
import { useIsMounted } from '../../../hooks'
import dynamic from "next/dynamic";

const Ads = dynamic(() => import('../../Ads'), { ssr: false })

type Props = {
    take: number
    excludeId?: number
    destinationId?: number
    ad?: string
}

const NewsLatest = ({ take, excludeId, destinationId, ad }: Props) => {
    const [news, setNews] = useState<NewsCardType[]>([])
    const isMounted = useIsMounted()

    useEffect(() => {
        getLatestNews(take, excludeId, destinationId)
            .then((res) => {
                if (isMounted()) {
                    setNews(res.data)
                }
            })
            .catch((e) => {})
    }, [destinationId, excludeId])

    return (
        <div className={styles.NewsLatest}>
            <BlockTitle title={'Uudised'} />
            <div className={styles.NewsGrid}>
                {news.map((newsItem: NewsCardType, index: number) => {
                    if (ad && index === 1) {
                        return (
                            <>
                                <div className={styles.Ad}><Ads type={ad} /></div>
                                <NewsCard {...newsItem} key={newsItem.id} />
                            </>
                        )
                    } else return <NewsCard {...newsItem} key={newsItem.id} />
                })}
            </div>
            <div className={styles.ViewMore}>
                <MoreLink route={'/uudised'} title={'Kõik uudised'} />
            </div>
        </div>
    )
}

NewsLatest.defaultProps = {
    take: 3,
}

export default NewsLatest
