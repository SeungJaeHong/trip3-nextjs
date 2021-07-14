import React, {Fragment} from 'react'
import Header from "../../components/Header"
import {GetServerSideProps} from "next";
import axios from "axios";
import Footer from "../../components/Footer";
import containerStyle from "../../styles/containers.module.scss";
import styles from "./TravelmatePage.module.scss"
import {TravelmateRowType} from "../../types";
import MoreLink from "../../components/MoreLink";
import SimplePaginator from "../../components/Paginator/SimplePaginator";
import {objectToQueryString} from "../../helpers";
import {useRouter} from "next/router"
import Button from "../../components/Button"
import TravelmateCard from "../../components/Travelmate/TravelmateCard";

type Props = {
    travelmates: TravelmateRowType[],
    currentPage: number,
    destination?: number,
    topic?: number,
    hasMore: boolean,
}

const TravelmatesIndex = (props: Props) => {
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
            <Header title={'Reisikaaslased'}>
                <div>
                    HEader
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.Content}>
                    <div className={styles.TravelmateGridContainer}>
                        <div className={styles.TravelmateGrid}>
                            {props.travelmates.map((travelmate: TravelmateRowType) => {
                                return <TravelmateCard {...travelmate} key={travelmate.id} />
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
                            <div className={styles.DescriptionFirstPart}>
                                Soovid kaaslaseks eksperti oma esimesele matkareisile? Lihtsalt seltsilist palmi alla?
                            </div>
                            <div className={styles.DescriptionSecondPart}>
                                Siit leiad omale sobiva reisikaaslase. Kasuta ka allpool olevat filtrit soovitud tulemuse saamiseks.
                            </div>
                            <div className={styles.MoreLink}>
                                <MoreLink route={'/'} title={'Kasutustingimused'} medium={true} />
                            </div>
                            <div className={styles.AddNewButton}>
                                <Button title={'Lisa kuulutus'} route={'/'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    const destination = context.query?.destination
    const topic = context.query?.topic
    let url = process.env.API_BASE_URL + '/travelmates'
    if (page) {
        url += '?page=' + page
    }

    const data = {
        user: null,
        travelmates: [],
        currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
        hasMore: false,
    }

    const res = await axios.get(url)
    data.user = res.data.user
    data.travelmates = res.data.travelmates?.items
    data.hasMore = res.data.travelmates?.hasMore

    return {
        props: data
    }
}

export default TravelmatesIndex