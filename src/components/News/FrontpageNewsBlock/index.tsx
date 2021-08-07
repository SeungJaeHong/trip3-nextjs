import styles from './FrontpageNewsBlock.module.scss'
import BlockTitle from "../../BlockTitle"
import NewsCard from "../NewsCard"
import {useEffect, useState} from "react"
import {getNewsData} from "../../../api/frontpage"
import {NewsCardType} from "../../../types"
import MoreLink from "../../MoreLink";

const FrontpageNewsBlock = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            const result = await getNewsData()
            setNews(result.data.news);
        }

        getNews();
    }, [])

    return (
        <div className={styles.FrontpageNewsBlock}>
            <BlockTitle title={'Uudised'} route={'/'} />
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