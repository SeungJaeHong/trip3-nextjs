import React, { Fragment, useState } from 'react'
import Header from '../../components/Header'
import { GetServerSideProps } from 'next'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import styles from './TravelmateIndex.module.scss'
import { Destination, Topic, TravelmateRowType } from '../../types'
import MoreLink from '../../components/MoreLink'
import SimplePaginator from '../../components/Paginator/SimplePaginator'
import { objectToQueryString } from '../../helpers'
import { useRouter } from 'next/router'
import Button from '../../components/Button'
import TravelmateCard from '../../components/Travelmate/TravelmateCard'
import TravelmateFilter from '../../components/Travelmate/TravelmateFilter'
import ApiClientSSR from '../../lib/ApiClientSSR'
import RelatedContentBlock from '../../components/RelatedContentBlock'
import { useUser } from '../../hooks'
import { NextSeo } from 'next-seo'
import dynamic from "next/dynamic"
import clsx from "clsx";

const Ads = dynamic(() => import('../../components/Ads'), { ssr: false })

type Props = {
    travelmates: TravelmateRowType[]
    destinations: Destination[]
    topics: Topic[]
    startOptions: { value: string; label: string }[]
    selectedDestination?: number
    selectedTopic?: number
    selectedStart?: string
    currentPage: number
    hasMore: boolean
}

const TravelmatesIndex = ({
    travelmates,
    destinations,
    topics,
    startOptions,
    selectedDestination,
    selectedTopic,
    selectedStart,
    currentPage,
    hasMore,
}: Props) => {
    const [destination, setDestination] = useState<number | undefined>(selectedDestination)
    const [topic, setTopic] = useState<number | undefined>(selectedTopic)
    const [start, setStart] = useState<string | undefined>(selectedStart)
    const router = useRouter()
    const { userIsLoggedIn } = useUser()

    const getNextPageUrl = () => {
        if (!hasMore) {
            return undefined
        }

        const urlParams = {
            destination: destination,
            topic: topic,
            start: start,
            page: currentPage + 1,
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (currentPage > 1) {
            const urlParams = {
                destination: destination,
                topic: topic,
                start: start,
                page: currentPage - 1,
            }

            const queryString = objectToQueryString(urlParams)
            return router.pathname + '?' + queryString
        } else {
            return undefined
        }
    }

    const onSearch = () => {
        const urlParams = {
            destination: destination,
            topic: topic,
            start: start,
        }

        const queryString = objectToQueryString(urlParams)
        router.push('/reisikaaslased?' + queryString)
    }

    const middle = travelmates ? Math.floor(travelmates?.length / 2) : undefined
    const oneThird = travelmates ? Math.floor(travelmates?.length / 3) : undefined
    const twoThirds = oneThird ? Math.floor(oneThird * 2) : undefined

    const renderCard = (travelmate: TravelmateRowType, index: number) => {
        return (
            <Fragment key={travelmate.id}>
                <TravelmateCard {...travelmate} />
                {(oneThird !== undefined && oneThird === index + 1) &&
                    <div className={clsx(styles.MobileAd)}>
                        <Ads type={'mobile_320x200'} />
                    </div>
                }
                {(twoThirds !== undefined && twoThirds === index) &&
                    <div className={clsx(styles.MobileAd)}>
                        <Ads type={'mobile_320x200_2'} />
                    </div>
                }
                {/*{(middle !== undefined && middle === index ) &&
                    <div className={clsx(styles.Ad)}>
                        <Ads type={'desktop_body'} />
                    </div>
                }*/}
            </Fragment>
        )
    }

    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | Reisikaaslased'}
                description={'Leia endale reisikaaslane juba planeeritud reisiks või uute plaanide koostamiseks'}
                openGraph={{
                    title: 'Reisikaaslased',
                    description: 'Leia endale reisikaaslane juba planeeritud reisiks või uute plaanide koostamiseks',
                }}
            />
            <Header title={'Reisikaaslased'} className={styles.TravelmatesHeader}>
                <div className={styles.FilterContainer}>
                    <TravelmateFilter
                        destinations={destinations}
                        topics={topics}
                        startOptions={startOptions}
                        selectedDestination={destination}
                        onChangeDestination={setDestination}
                        selectedTopic={topic}
                        onChangeTopic={setTopic}
                        selectedStart={start}
                        onChangeStart={setStart}
                        onSearch={onSearch}
                    />
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.Content}>
                    <div className={styles.TravelmateGridContainer}>
                        <div className={styles.TravelmateGrid}>
                            {travelmates.length === 0 && <div className={styles.NoResults}>Tulemusi ei leitud</div>}
                            {travelmates.map((travelmate: TravelmateRowType, index: number) => {
                                return renderCard(travelmate, index)
                            })}
                        </div>
                        {(getNextPageUrl() || getPreviousPageUrl()) &&
                            <div className={styles.Paginator}>
                                <SimplePaginator nextPageUrl={getNextPageUrl()} previousPageUrl={getPreviousPageUrl()} />
                            </div>
                        }
                        <div className={styles.Ads}>
                            <Ads type={'mobile_320x200_3'} />
                            {/*<Ads type={'desktop_body'} />*/}
                        </div>
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={clsx(styles.DescriptionBlock,  {
                            [styles.hideWhenNotLoggedIn]: !userIsLoggedIn
                        })}>
                            <div className={styles.DescriptionFirstPart}>
                                Soovid kaaslaseks eksperti oma esimesele matkareisile? Lihtsalt seltsilist palmi alla?
                            </div>
                            <div className={styles.DescriptionSecondPart}>
                                Siit leiad omale sobiva reisikaaslase. Kasuta ka ülevalpool olevat filtrit soovitud
                                tulemuse saamiseks.
                            </div>
                            <div className={styles.MoreLink}>
                                <MoreLink route={'/kasutustingimused'} title={'Kasutustingimused'} medium={true} />
                            </div>
                            {userIsLoggedIn && (
                                <div className={styles.AddNewButton}>
                                    <Button
                                        title={'Lisa kuulutus'}
                                        onClick={() => router.push('/reisikaaslased/lisa-uus')}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.Ads}>
                            <Ads type={'desktop_sidebar_small'} />
                            <Ads type={'desktop_sidebar_large'} />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedContentBlock type={'travelmate'} />
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    const destination = context.query?.destination
    const topic = context.query?.topic
    const start = context.query?.start
    let url = process.env.API_BASE_URL + '/travelmates'

    const urlParams = {
        destination: destination,
        topic: topic,
        start: start,
        page: page,
    }

    const queryString = objectToQueryString(urlParams)
    url += '?' + queryString
    const res = await ApiClientSSR(context).get(url)
    return {
        props: {
            travelmates: res.data.items,
            currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
            hasMore: res.data.hasMore,
            destinations: res.data.destinations,
            topics: res.data.topics,
            startOptions: res.data.startOptions,
            selectedDestination: destination ? destination : null,
            selectedTopic: topic ? topic : null,
            selectedStart: start ? start : null,
        },
    }
}

export default TravelmatesIndex
