import React, {Fragment} from 'react'
import axios from 'axios'
import {GetServerSideProps} from "next"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import ForumTabs from "../../../components/Forum/ForumTabs"
import clsx from "clsx"
import styles from "./Uldfoorum.module.scss"
import containerStyle from "../../../styles/containers.module.scss"
import MainSearchInput from "../../../components/MainSearchInput"
import Select from 'react-select'
import {ForumRowType} from "../../../types"
import ForumList from "../../../components/Forum/ForumList"
import SimplePaginator from "../../../components/Paginator/SimplePaginator"
import {objectToQueryString} from "../../../helpers"
import BlockTitle from "../../../components/BlockTitle"
import Button from "../../../components/Button"

type Props = {
    forumPosts: ForumRowType[],
    currentPage: number,
    topic?: number,
    destination?: number,
    hasMore: boolean,
}

const MainForumIndex = (props: Props) => {

    console.log(props)

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
        return '/foorum/uldfoorum?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (props.currentPage > 1) {
            const urlParams = {
                topic: props.topic,
                destination: props.destination,
                page: props.currentPage - 1
            }

            const queryString = objectToQueryString(urlParams)
            return '/foorum/uldfoorum?' + queryString
        } else {
            return undefined
        }
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
                <div className={styles.Search}>
                    <MainSearchInput placeholder={'Otsi üldfoorumist...'} />
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
                            <BlockTitle title={'Üldfoorum'} />
                            <div className={styles.ForumDescription}>
                                Eesti suurim reisifoorum. Küsi siin oma küsimus või jaga häid soovitusi.
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    const destination = context.query?.destination
    const topic = context.query?.topic
    let url = process.env.API_BASE_URL + '/forum/general'
    if (page) {
        url += '?page=' + page
    }

    const data = {
        user: null,
        forumPosts: [],
        currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
        hasMore: false,
    }

    const res = await axios.get(url)
    data.user = res.data.user
    data.forumPosts = res.data.forumList?.items
    data.hasMore = res.data.forumList?.hasMore

    return {
        props: data
    }
}

export default MainForumIndex