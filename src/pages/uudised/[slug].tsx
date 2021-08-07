import React, {Fragment} from 'react'
import axios from 'axios'
import {GetServerSideProps} from 'next'
import {Destination, NewsContent, Topic} from "../../types"
import Header from "../../components/Header"
import styles from "./NewsPage.module.scss"
import containerStyle from "../../styles/containers.module.scss"
import Tag from "../../components/Tag"
import clsx from "clsx"
import Button from "../../components/Button"
import UserAvatar from "../../components/User/UserAvatar";
import Footer from "../../components/Footer";

type Props = {
    news: NewsContent
}

const NewsShow = (props: Props) => {
    return (
        <Fragment>
            <Header backgroundImage={props.news.backgroundImageUrl}>
                <div className={clsx(containerStyle.CenteredContainer, styles.HeaderContainer)}>
                    <div className={styles.HeaderTitle}>
                        {props.news.title}
                    </div>
                    <div className={styles.DateAndUser}>
                        <div className={styles.User}>
                            <UserAvatar {...props.news.user} />
                        </div>
                        <div className={styles.HeaderDate}>
                            {props.news.createdAt}
                        </div>
                    </div>
                    <div className={styles.Tags}>
                        {props.news.destinations?.map((destination: Destination) => {
                            return <Tag title={destination.name} type={'destination'} large={true} key={destination.id} />
                        })}
                        {props.news.topics?.map((topic: Topic) => {
                            return <Tag title={topic.name} large={true} white={true} key={topic.id} />
                        })}
                    </div>
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.BodyContainer}>
                    <div className={styles.Body} dangerouslySetInnerHTML={{ __html: props.news.body }} />
                    <div className={styles.SidebarShow}>
                        <div className={styles.AddNewNews}>
                            <Button title={'Lisa uus uudis'} route={'/'} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.query.slug
    let url = process.env.API_BASE_URL + '/news/' + slug

    const response = await axios.get(url)
    const data = {
        user: response.data.user,
        news: response.data.news,
    }

    return {
        props: data
    }
}

export default NewsShow