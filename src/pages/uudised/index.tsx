import React, {Fragment} from 'react'
import Header from "../../components/Header"
import {GetServerSideProps} from "next";
import axios from "axios";
import containerStyle from "../../styles/containers.module.scss";
import styles from "./NewsPage.module.scss"
import {NewsCardType} from "../../types";
import SimplePaginator from "../../components/Paginator/SimplePaginator";
import Button from "../../components/Button";
import MainSearchInput from "../../components/MainSearchInput"
import NewsCard from "../../components/News/NewsCard"
import {useRouter} from "next/router"
import {objectToQueryString} from "../../helpers"

type Props = {
    news?: NewsCardType[],
    currentPage: number,
    destination?: number,
    topic?: number,
    hasMore: boolean,
}

const NewsIndex = (props: Props) => {
    const router = useRouter()
    const getNextPageUrl = () => {
        if (!props.hasMore) {
            return undefined
        }

        const urlParams = {
            destination: props.destination,
            topic: props.topic,
            page: props.currentPage + 1
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (props.currentPage > 1) {
            const urlParams = {
                destination: props.destination,
                topic: props.topic,
                page: props.currentPage - 1
            }

            const queryString = objectToQueryString(urlParams)
            return router.pathname + '?' + queryString
        } else {
            return undefined
        }
    }

    return (
        <Fragment>
            <Header title={'Uudised'}>
                <div className={styles.Search}>
                    <MainSearchInput placeholder={'Otsi uudistest...'} />
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.Content}>
                    <div className={styles.NewsGridContainer}>
                        <div className={styles.NewsGrid}>
                            {props.news?.map((news: NewsCardType) => {
                                return <NewsCard {...news} key={news.id} />
                            })}
                        </div>
                        <div className={styles.Paginator}>
                            <SimplePaginator
                                nextPageUrl={getNextPageUrl()}
                                previousPageUrl={getPreviousPageUrl()} />
                        </div>
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.DescriptionBlock}>
                            <div className={styles.Description}>
                                Uudised reisimisest, reisi- ja lennufirmadest, viisadest ja muust parasjagu aktuaalsest.
                            </div>
                            <div className={styles.AddNewButton}>
                                <Button title={'Lisa uudis'} route={'/'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    //const destination = context.query?.destination
    //const topic = context.query?.topic
    let url = process.env.API_BASE_URL + '/news'
    if (page) {
        url += '?page=' + page
    }

    const data = {
        user: null,
        news: [],
        currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
        hasMore: false,
    }

    const res = await axios.get(url)
    data.user = res.data.user
    data.news = res.data?.news?.items
    data.hasMore = res.data.news?.hasMore

    return {
        props: data
    }
}

export default NewsIndex