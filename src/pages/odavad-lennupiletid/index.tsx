import React, { Fragment, useState } from 'react'
import Header from '../../components/Header'
import { GetServerSideProps } from 'next'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import styles from './FlightOfferPage.module.scss'
import FlightOfferFilterTags from '../../components/FlightOffer/FlightOfferFilterTags'
import { FlightOfferRowType } from '../../types'
import FlightOfferList from '../../components/FlightOffer/FlightOfferList'
import MoreLink from '../../components/MoreLink'
import SimplePaginator from '../../components/Paginator/SimplePaginator'
import { objectToQueryString } from '../../helpers'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import ApiClientSSR from '../../lib/ApiClientSSR'

type Props = {
    flightOffers: FlightOfferRowType[]
    filterTags: { id: number; name: string }[]
    currentPage: number
    filter: []
    hasMore: boolean
}

const FlightsIndex = ({ flightOffers, filterTags, currentPage, filter, hasMore }: Props) => {
    const [filters, setFilters] = useState<Array<number>>(filter)
    const router = useRouter()

    const getNextPageUrl = () => {
        if (!hasMore) {
            return undefined
        }

        const urlParams = {
            filter: filters,
            page: currentPage + 1,
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (currentPage > 1) {
            const urlParams = {
                filter: filters,
                page: currentPage - 1,
            }

            const queryString = objectToQueryString(urlParams)
            return router.pathname + '?' + queryString
        } else {
            return undefined
        }
    }

    const toggle = (id: number) => {
        if (filters.includes(id)) {
            return filters.filter((i) => i !== id)
        } else return [...filters, id]
    }

    const onFilterSelect = (id: number) => {
        const newFilters = toggle(id)
        setFilters(newFilters)

        const urlParams = {
            filter: newFilters,
            page: 1,
        }

        const queryString = objectToQueryString(urlParams)
        router.push(router.pathname + '?' + queryString)
    }

    return (
        <Fragment>
            <Header title={'Lennupakkumised'}>
                <div className={styles.FlightOfferTabs}>
                    <FlightOfferFilterTags tags={filterTags} selected={filters} onSelect={onFilterSelect} />
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={containerStyle.CenteredContainer}>
                    <div className={styles.Content}>
                        <div className={styles.FlightOfferList}>
                            <FlightOfferList items={flightOffers} />
                            <div className={styles.Paginator}>
                                <SimplePaginator
                                    nextPageUrl={getNextPageUrl()}
                                    previousPageUrl={getPreviousPageUrl()}
                                />
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
                            <div className={styles.AddNewButton}>
                                <Button
                                    title={'Lisa uus pakkumine'}
                                    onClick={() => router.push('/odavad-lennupiletid/lisa-uus')}
                                />
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

    const urlParams = {
        filter: filter,
        page: page,
    }

    const queryString = objectToQueryString(urlParams)
    url += '?' + queryString

    const res = await ApiClientSSR(context).get(url)

    let filterValue: Array<number> = []
    if (filter) {
        if (typeof filter === 'string') {
            const values = filter.split(',')
            filterValue = values.map(x => parseInt(x))
        }
    }

    return {
        props: {
            flightOffers: res.data.flightOffers?.items,
            filterTags: res.data.filterTags,
            currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
            hasMore: res.data.flightOffers?.hasMore,
            filter: filterValue
        },
    }
}

export default FlightsIndex
