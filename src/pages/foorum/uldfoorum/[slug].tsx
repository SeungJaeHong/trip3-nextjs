import React, {Fragment} from 'react'
import axios from 'axios'
import {GetServerSideProps} from 'next'
import Head from 'next/head'
import Header from "../../../components/Header"
import Footer from "../../../components/Footer";
import clsx from "clsx";
import containerStyle from "../../../styles/containers.module.scss";
import styles from "./ForumShowPage.module.scss";
import Button from "../../../components/Button";
import {Content} from "../../../types"
import ForumPost from "../../../components/Forum/ForumPost"
import ForumPostComments from "../../../components/Forum/ForumPostComments";
import MoreLink from "../../../components/MoreLink";

type Props = {
    post: Content,
    currentPage: number,
    lastPage: number
}

const ForumShow = (props: Props) => {
    return (
        <Fragment>
            <Header withBackgroundMap={true} className={styles.Header} />
            <div className={containerStyle.ContainerXl}>
                {/*<div className={containerStyle.CenteredContainer}>*/}
                    <div className={styles.Content}>
                        <div className={styles.ForumContent}>
                            <div className={styles.ForumPost}>
                                <ForumPost {...props.post} />
                            </div>
                            {props.post.comments?.length ? <div className={styles.LatestCommentLink}>
                                <MoreLink route={'/'} title={'Mine uusima kommentaari juurde'} />
                            </div> : null}
                            <ForumPostComments
                                post={props.post}
                                comments={props.post.comments}
                                currentPage={props.currentPage}
                                lastPage={props.lastPage} />
                        </div>
                        <div className={styles.Sidebar}>
                            Sidebar
                        </div>
                    </div>
                {/*</div>*/}
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.query.slug
    const page = context.query?.page
    let url = process.env.API_BASE_URL + '/forum/general/' + slug
    if (page) {
        url += '?page=' + page
    }

    const response = await axios.get(url)
    const data = {
        user: response.data.user,
        post: response.data.post,
        currentPage: response.data.currentPage,
        lastPage: response.data.lastPage
    }

    return {
        props: data
    }
}

export default ForumShow