import styles from './NewsLatest.module.scss'
import BlockTitle from '../../BlockTitle'
import NewsCard from '../NewsCard'
import { useEffect, useState } from 'react'
import { NewsCardType } from '../../../types'
import MoreLink from '../../MoreLink'
import { getLatestNews } from '../../../services/news.service'

type Props = {
    take: number
    excludeId?: number
    destinationId?: number
}

const NewsLatest = ({ take, excludeId, destinationId }: Props) => {
    const [news, setNews] = useState<NewsCardType[]>([])

    useEffect(() => {
        getLatestNews(take, excludeId, destinationId)
            .then((res) => {
                setNews(res.data)
            })
            .catch((e) => {})
    }, [destinationId, excludeId])

    return (
        <div className={styles.NewsLatest}>
            <BlockTitle title={'Uudised'} />
            <div className={styles.NewsGrid}>
                {news.map((newsItem: NewsCardType) => {
                    return <NewsCard {...newsItem} key={newsItem.id} />
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
