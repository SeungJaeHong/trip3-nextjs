import React, {Fragment} from 'react'
import Header from "../../components/Header"
import {GetServerSideProps} from "next";
import axios from "axios";
import Footer from "../../components/Footer";
import containerStyle from "../../styles/containers.module.scss";
import styles from "./FlightOfferPage.module.scss"
import FlightOfferFilterTabs from "../../components/FlightOffer/FlightOfferFilterTags"
import {FlightOfferRowType} from "../../types";
import FlightOfferList from "../../components/FlightOffer/FlightOfferList";
import MoreLink from "../../components/MoreLink";
import SimplePaginator from "../../components/Paginator/SimplePaginator";
import {objectToQueryString} from "../../helpers";
import {useRouter} from "next/router"

type Props = {
    flightOffers: FlightOfferRowType[],
    currentPage: number,
    filter?: [],
    destination?: number,
    hasMore: boolean,
}

const FlightsIndex = (props: Props) => {
    const router = useRouter()
    const getNextPageUrl = () => {
        if (!props.hasMore) {
            return undefined
        }

        const urlParams = {
            filter: props.filter,
            page: props.currentPage + 1
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (props.currentPage > 1) {
            const urlParams = {
                filter: props.filter,
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
            <Header title={'Lennupakkumised'}>
                <div className={styles.FlightOfferTabs}>
                    <FlightOfferFilterTabs />
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={containerStyle.CenteredContainer}>
                    <div className={styles.Content}>
                        <div className={styles.FlightOfferList}>
                            <FlightOfferList items={props.flightOffers} />
                            <div className={styles.Paginator}>
                                <SimplePaginator
                                    nextPageUrl={getNextPageUrl()}
                                    previousPageUrl={getPreviousPageUrl()} />
                            </div>
                        </div>
                        <div className={styles.Sidebar}>
                            <div className={styles.DescriptionBlock}>
                                <div className={styles.DescriptionFirstPart}>
                                    Hoiame headel pakkumistel igapäevaselt silma peal ja jagame neid kõigi huvilistega.
                                </div>
                                <div className={styles.DescriptionSecondPart}>
                                    Vaata soodsaid lennupakkumisi ning alusta oma reisi planeerimist siit.
                                </div>
                                <div className={styles.MoreLink}>
                                    <MoreLink route={'/'} title={'Loe lähemalt Trip.ee-st'} medium={true} />
                                </div>
                                <div className={styles.MoreLink}>
                                    <MoreLink route={'/'} title={'Mis on veahind'} medium={true} />
                                </div>
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
    const filter = context.query?.filter
    let url = process.env.API_BASE_URL + '/flights'
    if (page) {
        url += '?page=' + page
    }

    const data = {
        user: null,
        flightOffers: [],
        currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
        hasMore: false,
    }

    const res = await axios.get(url)
    data.user = res.data.user
    data.flightOffers = res.data.flightOffers?.items
    data.hasMore = res.data.flightOffers?.hasMore

    return {
        props: data
    }
}

export default FlightsIndex