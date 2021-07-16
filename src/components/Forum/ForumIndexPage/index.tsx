import React, {Fragment} from "react"
import {ForumRowType} from "../../../types"
import {objectToQueryString} from "../../../helpers";
import ForumList from "../ForumList";
import SimplePaginator from "../../Paginator/SimplePaginator";
import Header from "../../Header";
import MainSearchInput from "../../MainSearchInput";
import Select from "react-select";
import clsx from "clsx";
import containerStyle from "../../../styles/containers.module.scss";
import ForumTabs from "../ForumTabs";
import BlockTitle from "../../BlockTitle"
import Button from "../../Button"
import Footer from "../../Footer"
import styles from "./ForumIndexPage.module.scss"
import { useRouter } from 'next/router'

type Props = {
    type: 'general' | 'buysell' | 'foreign' | 'other' | 'follows',
    title: string,
    description: string,
    searchPlaceholder: string,
    forumPosts: ForumRowType[],
    currentPage: number,
    topic?: number,
    destination?: number,
    hasMore: boolean
}

const ForumIndexPage = (props: Props) => {
    const router = useRouter()
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'value1', label: 'Value1' },
        { value: 'value2', label: 'Value2' }
    ]

    const getNextPageUrl = () => {
        if (!props.hasMore) {
            return undefined
        }

        const urlParams = {
            topic: props.topic,
            destination: props.destination,
            page: props.currentPage + 1
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (props.currentPage > 1) {
            const urlParams = {
                topic: props.topic,
                destination: props.destination,
                page: props.currentPage - 1
            }

            const queryString = objectToQueryString(urlParams)
            return router.pathname + '?' + queryString
        } else {
            return undefined
        }
    }

    const renderSearchAndFilters = () => {
        if (props.type === 'follows') {
            return <div className={styles.NoSearch} />
        }

        return (
            <Fragment>
                <div className={styles.Search}>
                    <MainSearchInput placeholder={props.searchPlaceholder} />
                </div>
                <div className={styles.Filters}>
                    <div className={styles.Select}>
                        <Select
                            instanceId={'destination'}
                            options={options}
                            className={styles.Select}
                            classNamePrefix={'ForumFilter'}
                            isClearable={true}
                            placeholder={'Sihtkoht'} />
                    </div>
                    <div className={styles.Select}>
                        <Select
                            instanceId={'topic'}
                            options={options}
                            className={styles.Select}
                            classNamePrefix={'ForumFilter'}
                            isClearable={true}
                            placeholder={'Valdkond'} />
                    </div>
                </div>
            </Fragment>
        )
    }

    const showList = () => {
        if (!props.forumPosts.length) {
            return <div>Tulemusi ei leitud</div>
        }

        return (
            <Fragment>
                <ForumList items={props.forumPosts} />
                <div className={styles.Paginator}>
                    <SimplePaginator
                        nextPageUrl={getNextPageUrl()}
                        previousPageUrl={getPreviousPageUrl()} />
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Header>
                <Fragment>
                    {renderSearchAndFilters()}
                </Fragment>
                <div className={clsx(containerStyle.CenteredContainer, styles.Tabs)}>
                    <ForumTabs />
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={containerStyle.CenteredContainer}>
                    <div className={styles.Content}>
                        <div className={styles.ForumList}>
                            {showList()}
                        </div>
                        <div className={styles.Sidebar}>
                            <BlockTitle title={props.title} />
                            <div className={styles.ForumDescription}>
                                {props.description}
                            </div>
                            <div className={styles.AddNewTopic}>
                                <Button title={'Alusta uut teemat'} route={'/'} />
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