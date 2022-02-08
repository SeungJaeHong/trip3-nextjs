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

type Props = {
    travelmates: TravelmateRowType[]
    destinations: Destination[]
    topics: Topic[]
    selectedDestination?: number
    selectedTopic?: number
    selectedStart?: string
    selectedAge?: string
    selectedGender?: string
    currentPage: number
    hasMore: boolean
}

const TravelmatesIndex = ({
    travelmates,
    destinations,
    topics,
    selectedDestination,
    selectedTopic,
    selectedStart,
    selectedAge,
    selectedGender,
    currentPage,
    hasMore,
}: Props) => {
    const [destination, setDestination] = useState<number | undefined>(selectedDestination)
    const [topic, setTopic] = useState<number | undefined>(selectedTopic)
    const [age, setAge] = useState<string | undefined>(selectedAge)
    const [gender, setGender] = useState<string | undefined>(selectedGender)
    const [start, setStart] = useState<string | undefined>(selectedStart)
    const router = useRouter()

    const getNextPageUrl = () => {
        if (!hasMore) {
            return undefined
        }

        const urlParams = {
            destination: destination,
            topic: topic,
            start: start,
            age: age,
            gender: gender,
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
                age: age,
                gender: gender,
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
            age: age,
            gender: gender,
        }

        const queryString = objectToQueryString(urlParams)
        router.push('/reisikaaslased?' + queryString)
    }

    return (
        <Fragment>
            <Header title={'Reisikaaslased'} className={styles.TravelmatesHeader}>
                <div className={styles.FilterContainer}>
                    <TravelmateFilter
                        destinations={destinations}
                        topics={topics}
                        selectedDestination={destination}
                        onChangeDestination={setDestination}
                        selectedTopic={topic}
                        onChangeTopic={setTopic}
                        selectedAge={age}
                        onChangeAge={setAge}
                        selectedGender={gender}
                        onChangeGender={setGender}
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
                            {travelmates.length === 0 &&
                                <div>Tulemusi ei leitud</div>
                            }
                            {travelmates.map((travelmate: TravelmateRowType) => {
                                return <TravelmateCard {...travelmate} key={travelmate.id} />
                            })}
                        </div>
                        <div className={styles.Paginator}>
                            <SimplePaginator nextPageUrl={getNextPageUrl()} previousPageUrl={getPreviousPageUrl()} />
                        </div>
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.DescriptionBlock}>
                            <div className={styles.DescriptionFirstPart}>
                                Soovid kaaslaseks eksperti oma esimesele matkareisile? Lihtsalt seltsilist palmi alla?
                            </div>
                            <div className={styles.DescriptionSecondPart}>
                                Siit leiad omale sobiva reisikaaslase. Kasuta ka allpool olevat filtrit soovitud
                                tulemuse saamiseks.
                            </div>
                            <div className={styles.MoreLink}>
                                <MoreLink route={'/kasutustingimused'} title={'Kasutustingimused'} medium={true} />
                            </div>
                            <div className={styles.AddNewButton}>
                                <Button title={'Lisa kuulutus'} onClick={() => router.push('/reisikaaslased/lisa-uus')} />
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
    const start = context.query?.start
    const age = context.query?.age
    const gender = context.query?.gender
    let url = process.env.API_BASE_URL + '/travelmates'

    const urlParams = {
        destination: destination,
        topic: topic,
        start: start,
        age: age,
        gender: gender,
        page: page
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
            selectedDestination: destination ? destination : null,
            selectedTopic: topic ? topic : null,
            selectedStart: start ? start : null,
            selectedAge: age ? age : null,
            selectedGender: gender ? gender : null,
        },
    }
}

export default TravelmatesIndex
