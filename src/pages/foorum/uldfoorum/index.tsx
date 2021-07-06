import React, {Fragment} from 'react'
import axios from 'axios'
import ForumRow from '../../../components/Forum/ForumRow'
import {GetServerSideProps} from "next"
import Link from 'next/link'
import Header from "../../../components/Header"
import Footer from "../../../components/Footer";
import ForumTabs from "../../../components/Forum/ForumTabs"
import clsx from "clsx";
import styles from "./Uldfoorum.module.scss"
import containerStyle from "../../../styles/containers.module.scss"
import MainSearchInput from "../../../components/MainSearchInput"
import Select from 'react-select'

const MainForumIndex = (props: any) => {
    //const posts = props?.content?.data || []
    //const currentPage = props?.content?.current_page || 1
    //const prevPage = currentPage > 1 ? currentPage - 1 : null
    //const nextPage = currentPage + 1
    //const nextPageUrl = props?.content?.next_page_url ? '/foorum/uldfoorum?page=' + nextPage : null
    //const prevPageUrl = props?.content?.prev_page_url ? '/foorum/uldfoorum?page=' + prevPage : null

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
        { value: 'value1', label: 'Value1' },
        { value: 'value2', label: 'Value2' }
    ]

    return (
        <Fragment>
            <Header>
                <div className={styles.Search}>
                    <MainSearchInput placeholder={'Otsi üldfoorumist...'} />
                </div>
                <div className={styles.Filters}>
                    <div className={styles.Select}>
                        <Select
                            instanceId={'select1'}
                            options={options}
                            className={styles.Select}
                            classNamePrefix={'ForumFilter'}
                            isClearable={true}
                            placeholder={'Sihtkoht'} />
                    </div>
                    <div className={styles.Select}>
                        <Select
                            instanceId={'select2'}
                            options={options}
                            className={styles.Select}
                            classNamePrefix={'ForumFilter'}
                            isClearable={true}
                            placeholder={'Valdkond'} />
                    </div>
                </div>
                <div className={styles.Tabs}>
                    <ForumTabs />
                </div>
            </Header>
            <div className={containerStyle.container_xl}>
                Content
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    let url = process.env.API_BASE_URL + '/forum'
    if (page) {
        url += '?page=' + page
    }

    const response = await axios.get(url)
    return {
        props: {
            content: response.data,
        }
    }
}

export default MainForumIndex