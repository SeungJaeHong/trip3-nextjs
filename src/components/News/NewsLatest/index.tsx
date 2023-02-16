import styles from './NewsLatest.module.scss'
import BlockTitle from '../../BlockTitle'
import NewsCard from '../NewsCard'
import React, {Fragment, useEffect, useState} from 'react'
import {ContentMarketingPost, NewsCardType} from '../../../types'
import MoreLink from '../../MoreLink'
import { getLatestNews } from '../../../services/news.service'
import { useIsMounted } from '../../../hooks'
import dynamic from "next/dynamic";
import ContentMarketingNewsCard from "../../ContentMarketing/NewsCard";

const Ads = dynamic(() => import('../../Ads'), { ssr: false })

type Props = {
    take: number
    excludeId?: number
    destinationId?: number
    ad?: string
    contentMarketingPost?: ContentMarketingPost
}

const NewsLatest = ({ take, excludeId, destinationId, ad, contentMarketingPost }: Props) => {
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
                            <Fragment key={newsItem.id}>
                                <div className={styles.Ad}><Ads type={ad} /></div>
                                <NewsCard {...newsItem} />
                            </Fragment>
                        )
                    } else if (contentMarketingPost && index === 2) {
                        return (
                            <Fragment key={newsItem.id}>
                                <ContentMarketingNewsCard {...contentMarketingPost} />
                                <NewsCard {...newsItem} />
                            </Fragment>
                        )
                    } else {
                        return <NewsCard {...newsItem} key={newsItem.id} />
                    }
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
