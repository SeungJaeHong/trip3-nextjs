import styles from './FrontpageNewsBlock.module.scss'
import BlockTitle from "../../BlockTitle"
import NewsCard from "../NewsCard"
import ShortNewsListItem from "../../ShortNewsListItem"
import {useEffect, useState} from "react"
import {getNewsData} from "../../../api/frontpage"

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
                {news.slice(0, 3).map((news: any) => {
                    return (
                        <div className={styles.NewsCard} key={news.id}>
                            <NewsCard />
                        </div>
                    )
                })}
            </div>
            <div className={styles.ShortNews}>
                <div className={styles.NewsCard}>
                    <NewsCard />
                </div>
                <div className={styles.ShortNewsList}>
                    {shortNews.map((shortNews: any) => {
                        return (
                            <div className={styles.ShortNewsListItem} key={shortNews.id}>
                                <ShortNewsListItem
                                    title={'Helsingi Vantaa lennujaamas on vaid 1200 lendajat päevas'}
                                    date={'Täna 12:42'} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FrontpageNewsBlock