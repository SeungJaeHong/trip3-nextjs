import React, {Fragment} from 'react'
import axios from 'axios'
import {GetServerSideProps} from 'next'
import {Destination, FlightContent, Topic} from "../../types"
import Header from "../../components/Header"
import styles from "./FlightOfferPage.module.scss"
import containerStyle from "../../styles/containers.module.scss"
import Tag from "../../components/Tag"
import clsx from "clsx";
import Button from "../../components/Button"

type Props = {
    flight: FlightContent
}

const FlightOfferShow = (props: Props) => {
    return (
        <Fragment>
            <Header backgroundImage={props.flight.backgroundImageUrl}>
                <div className={clsx(containerStyle.CenteredContainer, styles.HeaderContainer)}>
                    <div className={styles.HeaderTitle}>
                        {props.flight.title}
                    </div>
                    <div className={styles.HeaderDate}>
                        {props.flight.createdAt}
                    </div>
                    <div className={styles.Tags}>
                        {props.flight.destinations?.map((destination: Destination) => {
                            return <Tag title={destination.name} type={'destination'} large={true} key={destination.id} />
                        })}
                        {props.flight.topics?.map((topic: Topic) => {
                            return <Tag title={topic.name} large={true} key={topic.id} />
                        })}
                    </div>
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.BodyContainer}>
                    <div className={styles.Body} dangerouslySetInnerHTML={{ __html: props.flight.body }} />
                    <div className={styles.SidebarShow}>
                        <div className={styles.AddNewOffer}>
                            <Button title={'Lisa uus pakkumine'} route={'/'} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.query.slug
    //const page = context.query?.page
    let url = process.env.API_BASE_URL + '/flight/' + slug
    /*if (page) {
        url += '?page=' + page
    }*/

    const response = await axios.get(url)
    const data = {
        user: response.data.user,
        flight: response.data.flight,
        //currentPage: response.data.currentPage,
        //lastPage: response.data.lastPage
    }

    return {
        props: data
    }
}

export default FlightOfferShow