import styles from './FrontpageNewsBlock.module.scss'
import BlockTitle from "../../BlockTitle"
import NewsCard from "../NewsCard"
import ShortNewsListItem from "../../ShortNewsListItem"
import {useEffect, useState} from "react"
import {getNewsData} from "../../../api/frontpage"
import {NewsCardType, ShortNewsListItemType} from "../../../types"

const FrontpageNewsBlock = () => {
    const [news, setNews] = useState([]);
    const [shortNews, setShortNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            const result = await getNewsData()
            setNews(result.data.news);
            setShortNews(result.data.shortNews);
        }

        getNews();
    }, [])

    return (
        <div className={styles.FrontpageNewsBlock}>
            <BlockTitle title={'Uudised'} route={'/'} />
            <div className={styles.News}>
                {news.slice(0, 3).map((newsItem: NewsCardType) => {
                    return (
                        <div className={styles.NewsCard} key={newsItem.id}>
                            <NewsCard {...newsItem} />
                        </div>
                    )
                })}
            </div>
            <div className={styles.ShortNews}>
                <div className={styles.NewsCard}>
                    <NewsCard {...news[3]} />
                </div>
                <div className={styles.ShortNewsList}>
                    {shortNews.map((shortNewsItem: ShortNewsListItemType) => {
                        return (
                            <div className={styles.ShortNewsListItem} key={shortNewsItem.id}>
                                <ShortNewsListItem {...shortNewsItem} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FrontpageNewsBlock