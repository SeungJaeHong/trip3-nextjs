import React, { Fragment, useState } from 'react'
import { ForumRowType } from '../../../types'
import { objectToQueryString } from '../../../helpers'
import ForumList from '../ForumList'
import SimplePaginator from '../../Paginator/SimplePaginator'
import Header from '../../Header'
import MainSearchInput from '../../MainSearchInput'
import clsx from 'clsx'
import containerStyle from '../../../styles/containers.module.scss'
import ForumTabs from '../ForumTabs'
import BlockTitle from '../../BlockTitle'
import Button from '../../Button'
import Footer from '../../Footer'
import styles from './ForumIndexPage.module.scss'
import { useRouter } from 'next/router'
import FormSelect from '../../Form/FormSelect'

type Props = {
    type: 'general' | 'buysell' | 'foreign' | 'other' | 'follows'
    title: string
    description: string
    searchPlaceholder: string
    forumPosts: ForumRowType[]
    currentPage: number
    hasMore: boolean
    total: number
    search?: string
    topic?: number
    destination?: number
    destinationOptions: { value: string; label: string }[]
    topicOptions: { value: string; label: string }[]
}

const ForumIndexPage = (props: Props) => {
    const itemsPerPage = 15
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [destinationValue, setDestinationValue] = useState<string | undefined>(undefined)
    const [topicValue, setTopicValue] = useState<string | undefined>(undefined)
    const router = useRouter()

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

    const renderSearchAndFilters = () => {
        if (props.type === 'follows') {
            return <div className={styles.NoSearch} />
        }

        return (
            <div className={styles.SearchContainer}>
                <div className={styles.Search}>
                    <MainSearchInput
                        placeholder={props.searchPlaceholder}
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
                                    placeholder={'Sihtkoht'}
                                    className={styles.Select}
                                    classNamePrefix={'ForumFilter'}
                                    onChange={(value: string) => setDestinationValue(value)}
                                />
                                <FormSelect
                                    id={'topic'}
                                    options={props.topicOptions || []}
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
        )
    }

    const showList = () => {
        if (!props.forumPosts.length) {
            return <div>Tulemusi ei leitud</div>
        }

        return (
            <Fragment>
                {renderSearchResultInfo()}
                <ForumList items={props.forumPosts} />
                <div className={styles.Paginator}>
                    <SimplePaginator nextPageUrl={getNextPageUrl()} previousPageUrl={getPreviousPageUrl()} />
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Header>
                <Fragment>{renderSearchAndFilters()}</Fragment>
                <div className={clsx(containerStyle.CenteredContainer, styles.Tabs)}>
                    <ForumTabs />
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={containerStyle.CenteredContainer}>
                    <div className={styles.Content}>
                        <div className={styles.ForumList}>{showList()}</div>
                        <div className={styles.Sidebar}>
                            <BlockTitle title={props.title} />
                            <div className={styles.ForumDescription}>{props.description}</div>
                            <div className={styles.AddNewTopic}>
                                <Button title={'Alusta uut teemat'} route={'/foorum/lisa-uus'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default ForumIndexPage
