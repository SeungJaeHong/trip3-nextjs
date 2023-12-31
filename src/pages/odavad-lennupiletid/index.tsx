import React, { Fragment, useEffect, useState } from 'react'
import Header from '../../components/Header'
import { GetServerSideProps } from 'next'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import styles from './FlightOfferPage.module.scss'
import FlightOfferFilterTags from '../../components/FlightOffer/FlightOfferFilterTags'
import {ContentMarketingPost, FlightOfferRowType} from '../../types'
import FlightOfferList from '../../components/FlightOffer/FlightOfferList'
import MoreLink from '../../components/MoreLink'
import SimplePaginator from '../../components/Paginator/SimplePaginator'
import { objectToQueryString } from '../../helpers'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import ApiClientSSR from '../../lib/ApiClientSSR'
import RelatedContentBlock from '../../components/RelatedContentBlock'
import {useIsMounted, useUser} from '../../hooks'
import { NextSeo } from 'next-seo'
import FormSelect from '../../components/Form/FormSelect'
import dynamic from "next/dynamic"
import FlightOfferStickies from "../../components/FlightOffer/FlightOfferStickies";
import ContentMarketingSlider from "../../components/ContentMarketing/Slider/ContentMarketingSlider";
import {getContentMarketingPosts} from "../../services/flight.service";

const Ads = dynamic(() => import('../../components/Ads'), { ssr: false })

type Props = {
    flightOffers: FlightOfferRowType[]
    stickies: FlightOfferRowType[]
    filterTags: { id: number; name: string }[]
    currentPage: number
    filter: []
    hasMore: boolean
    destination: string
    destinationOptions: [{ label: string; value: string }]
}

const FlightsIndex = ({
    flightOffers,
    stickies,
    filterTags,
    currentPage,
    filter,
    hasMore,
    destination,
    destinationOptions,
}: Props) => {
    const [filters, setFilters] = useState<Array<number>>(filter)
    const [contentMarketingPosts, setContentMarketingPosts] = useState<ContentMarketingPost[]>([])
    const [selectedDestination, setSelectedDestination] = useState<string | undefined>(destination)
    const router = useRouter()
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const isMounted = useIsMounted()

    useEffect(() => {
        setSelectedDestination(destination)
        getContentMarketingPosts().then(res => {
            if (isMounted()) {
                setContentMarketingPosts(res.data)
            }
        }).catch(e => {

        })
    }, [destination])

    const getNextPageUrl = () => {
        if (!hasMore) {
            return undefined
        }

        const urlParams = {
            filter: filters,
            page: currentPage + 1,
            destination: selectedDestination,
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (currentPage > 1) {
            const urlParams = {
                filter: filters,
                page: currentPage - 1,
                destination: selectedDestination,
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
            destination: selectedDestination,
        }

        const queryString = objectToQueryString(urlParams)
        router.push(router.pathname + '?' + queryString)
    }

    const onSelectDestination = (id?: string) => {
        setSelectedDestination(id)
        const urlParams = {
            filter: filters,
            destination: id,
        }

        const queryString = objectToQueryString(urlParams)
        router.push(router.pathname + '?' + queryString)
    }

    const renderResults = () => {
        if (flightOffers.length === 0) {
            return <div className={styles.NoResults}>Tulemusi ei leitud</div>
        }

        return (
            <>
                {stickies.length > 0 && <FlightOfferStickies items={stickies} />}
                <FlightOfferList items={flightOffers} withAds={flightOffers.length > 0} />
            </>
        )
    }

    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | Lennupakkumised'}
                description={
                    'Kõik odavad lennupiletid mugavalt ühelt lehel. Vaata soodsaid lennupakkumisi ning alusta oma reisi planeerimist siit'
                }
                openGraph={{
                    title: 'Lennupakkumised',
                    description:
                        'Kõik odavad lennupiletid mugavalt ühelt lehel. Vaata soodsaid lennupakkumisi ning alusta oma reisi planeerimist siit',
                }}
            />
            <Header title={'Lennupakkumised'}>
                <div className={styles.FlightOfferTabs}>
                    <FlightOfferFilterTags tags={filterTags} selected={filters} onSelect={onFilterSelect} />
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.Content}>
                    <div className={styles.FlightOfferList}>
                        <div className={styles.DestinationSelect}>
                            <FormSelect
                                id={'destination'}
                                options={destinationOptions}
                                placeholder={'Vali sihtkoht'}
                                value={selectedDestination}
                                onChange={onSelectDestination}
                                key={selectedDestination?.toString()}
                            />
                        </div>
                        {flightOffers.length > 0 &&
                            (
                                <>
                                    <Ads type={'flightoffers_list_top'} className={styles.ListTopAd} />
                                    <Ads type={'mobile_320x200'} className={styles.ListTopAd} />
                                </>
                            )

                        }
                        {renderResults()}
                        <div className={styles.Paginator}>
                            <SimplePaginator
                                nextPageUrl={getNextPageUrl()}
                                previousPageUrl={getPreviousPageUrl()}
                            />
                        </div>
                        <Ads type={'mobile_320x200_3'} className={styles.ListTopAd} />
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
                                <MoreLink route={'/tripist'} title={'Loe lähemalt Trip.ee-st'} medium={true} />
                            </div>
                            <div className={styles.MoreLink}>
                                <MoreLink route={'/mis-on-veahind'} title={'Mis on veahind'} medium={true} />
                            </div>
                        </div>
                        {userIsAdmin && (
                            <div className={styles.AddNewButton}>
                                <Button
                                    title={'Lisa uus pakkumine'}
                                    onClick={() => router.push('/odavad-lennupiletid/lisa-uus')}
                                />
                            </div>
                        )}
                        <div className={styles.Ads}>
                            <Ads type={'desktop_sidebar_small'} />
                            {contentMarketingPosts.length > 0 && <div className={styles.ContentMarketingSlider}><ContentMarketingSlider posts={contentMarketingPosts} /></div>}
                            <Ads type={'desktop_sidebar_large'} />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedContentBlock type={'flight'} />
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    const filter = context.query?.filter
    const destination = context.query?.destination
    let url = process.env.API_BASE_URL + '/flights'

    const urlParams = {
        filter: filter,
        page: page,
        destination: destination,
    }

    const queryString = objectToQueryString(urlParams)
    url += '?' + queryString

    const res = await ApiClientSSR(context).get(url)

    let filterValue: Array<number> = []
    if (filter) {
        if (typeof filter === 'string') {
            const values = filter.split(',')
            filterValue = values.map((x) => parseInt(x))
        }
    }

    const destinationOptions: { value: string; label: string }[] = res.data?.destinations.map((destination: any) => ({
        label: destination.name,
        value: destination.id.toString(),
    }))

    return {
        props: {
            flightOffers: res.data.flightOffers?.items,
            stickies: res.data.stickies,
            filterTags: res.data.filterTags,
            currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
            hasMore: res.data.flightOffers?.hasMore,
            filter: filterValue,
            destination: destination || null,
            destinationOptions: destinationOptions,
        },
    }
}

export default FlightsIndex
