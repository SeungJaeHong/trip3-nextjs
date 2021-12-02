import styles from './FrontpageNewsBlock.module.scss'
import BlockTitle from "../../BlockTitle"
import NewsCard from "../NewsCard"
import {useEffect, useState} from "react"
import {NewsCardType} from "../../../types"
import MoreLink from "../../MoreLink"
import {getLatestNews} from "../../../services/news.service"

const FrontpageNewsBlock = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            const result = await getLatestNews()
            setNews(result.data);
        }

        getNews();
    }, [])

    return (
        <div className={styles.FrontpageNewsBlock}>
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

export default FrontpageNewsBlock