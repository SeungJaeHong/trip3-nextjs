import React, { Fragment, useState } from 'react'
import Header from '../../components/Header'
import { GetServerSideProps } from 'next'
import containerStyle from '../../styles/containers.module.scss'
import styles from './NewsPage.module.scss'
import { NewsCardType } from '../../types'
import SimplePaginator from '../../components/Paginator/SimplePaginator'
import Button from '../../components/Button'
import MainSearchInput from '../../components/MainSearchInput'
import NewsCard from '../../components/News/NewsCard'
import { useRouter } from 'next/router'
import { objectToQueryString } from '../../helpers'
import Footer from '../../components/Footer'
import ApiClientSSR from '../../lib/ApiClientSSR'
import useUser from '../../hooks'
import FormSelect from '../../components/Form/FormSelect'

type Props = {
    news?: NewsCardType[]
    currentPage: number
    hasMore: boolean
    total: number
    search?: string
    topic?: string
    destination?: string
    destinationOptions: { value: string; label: string }[]
    topicOptions: { value: string; label: string }[]
}

const NewsIndex = (props: Props) => {
    const router = useRouter()
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const itemsPerPage = 10
    const [destinationValue, setDestinationValue] = useState<string | undefined>(props.destination)
    const [topicValue, setTopicValue] = useState<string | undefined>(props.topic)

    let isFilterSearch = false
    if (props.destination || props.topic) {
        isFilterSearch = true
    }

    const [showFilter, setShowFilter] = useState<boolean>(isFilterSearch)

    const onSearch = (value: string) => {
        const urlParams = {
            q: value,
            destination: destinationValue,
            topic: topicValue,
        }

        const queryString = objectToQueryString(urlParams)
        router.push(router.pathname + '?' + queryString)
    }

    const getNextPageUrl = () => {
        if (!props.hasMore) {
            return undefined
        }

        const urlParams = {
            q: props.search,
            topic: props.topic,
            destination: props.destination,
            page: props.currentPage + 1,
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (props.currentPage > 1) {
            const urlParams = {
                q: props.search,
                topic: props.topic,
                destination: props.destination,
                page: props.currentPage - 1,
            }

            const queryString = objectToQueryString(urlParams)
            return router.pathname + '?' + queryString
        } else {
            return undefined
        }
    }

    const onToggleFilter = () => {
        setShowFilter(!showFilter)
    }

    const renderSearchResultInfo = () => {
        if (props.search || props.destination || props.topic) {
            const fromValue = (props.currentPage - 1) * itemsPerPage + 1
            let toValue = props.currentPage * itemsPerPage
            if (toValue > props.total) {
                toValue = props.total
            }

            if (props.total && props.total > itemsPerPage) {
                return (
                    <div className={styles.ResultCount}>
                        {`Kuvan ${fromValue}-${toValue} tulemust ${props.total}-st`}
                    </div>
                )
            } else return null
        } else return null
    }

    const renderGrid = () => {
        if (!props.news?.length) {
            return <div>Tulemusi ei leitud</div>
        }

        return (
            <Fragment>
                <div className={styles.NewsGrid}>
                    {props.news?.map((news: NewsCardType) => {
                        return <NewsCard {...news} key={news.id} />
                    })}
                </div>
                <div className={styles.Paginator}>
                    <SimplePaginator nextPageUrl={getNextPageUrl()} previousPageUrl={getPreviousPageUrl()} />
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Header title={'Uudised'}>
                <div className={styles.SearchContainer}>
                    <div className={styles.Search}>
                        <MainSearchInput
                            placeholder={'Otsi uudistest...'}
                            value={props.search}
                            onSearchClick={onSearch}
                            filterActive={showFilter}
                            onFilterClick={onToggleFilter}
                        />
                    </div>
                    {showFilter && (
                        <div className={styles.FilterContainer}>
                            <div className={styles.AdvancedSearch}>
                                <div className={styles.Filters}>
                                    <FormSelect
                                        id={'destination'}
                                        options={props.destinationOptions || []}
                                        value={destinationValue}
                                        placeholder={'Sihtkoht'}
                                        className={styles.Select}
                                        classNamePrefix={'ForumFilter'}
                                        onChange={(value: string) => setDestinationValue(value)}
                                    />
                                    <FormSelect
                                        id={'topic'}
                                        options={props.topicOptions || []}
                                        value={topicValue}
                                        placeholder={'Valdkond'}
                                        className={styles.Select}
                                        classNamePrefix={'ForumFilter'}
                                        onChange={(value: string) => setTopicValue(value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.Content}>
                    <div className={styles.NewsGridContainer}>
                        {renderSearchResultInfo()}
                        {renderGrid()}
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.DescriptionBlock}>
                            <div className={styles.Description}>
                                Uudised reisimisest, reisi- ja lennufirmadest, viisadest ja muust parasjagu aktuaalsest.
                            </div>
                            {userIsAdmin && (
                                <div className={styles.AddNewButton}>
                                    <Button title={'Lisa uudis'} route={'/uudised/lisa-uus'} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const q = context.query?.q
    const destination = context.query?.destination
    const topic = context.query?.topic
    const page = context.query?.page
    let url = process.env.API_BASE_URL + '/news'
    const urlParams = {
        q: q,
        topic: topic,
        destination: destination,
        page: page,
    }

    const queryString = objectToQueryString(urlParams)
    url += '?' + queryString

    const res = await ApiClientSSR(context).get(url)
    const destinationOptions: { value: string; label: string }[] = res.data?.destinations.map((destination: any) => ({
        label: destination.name,
        value: destination.id.toString(),
    }))
    const topicOptions: { value: string; label: string }[] = res.data?.topics.map((topic: any) => ({
        label: topic.name,
        value: topic.id.toString(),
    }))
    return {
        props: {
            news: res.data?.items || [],
            hasMore: res.data?.hasMore || false,
            total: res.data.total,
            currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
            search: q || '',
            destination: destination || null,
            topic: topic || null,
            destinationOptions: destinationOptions || [],
            topicOptions: topicOptions || [],
        },
    }
}

export default NewsIndex
