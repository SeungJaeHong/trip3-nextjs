import React, {Fragment} from 'react'
import {GetServerSideProps} from 'next'
import {Destination, FlightContent, Topic} from "../../types"
import Header from "../../components/Header"
import styles from "./FlightOfferPage.module.scss"
import containerStyle from "../../styles/containers.module.scss"
import Tag from "../../components/Tag"
import clsx from "clsx";
import Button from "../../components/Button"
import Footer from "../../components/Footer"
import parse from 'html-react-parser'
import FlightMap from "../../components/FlightMap"
import ApiClientSSR from "../../lib/ApiClientSSR"
import Alert from "../../components/Alert"

type Props = {
    flight: FlightContent
}

const FlightOfferShow = (props: Props) => {
    const renderBody = (htmlString: string) => {
        return parse(htmlString, {
            replace: (domNode: any) => {
                if (domNode.name === 'flightmap') {
                    return <FlightMap />
                }
            }
        })
    }

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
                            return <Tag title={destination.name} type={'destination'} route={'/sihtkoht/' + destination.slug} large={true} key={destination.id} />
                        })}
                        {props.flight.topics?.map((topic: Topic) => {
                            return <Tag title={topic.name} large={true} key={topic.id} />
                        })}
                    </div>
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.BodyContainer}>
                   {/* <div className={styles.Body} dangerouslySetInnerHTML={{ __html: props.flight.body }} />*/}

                    <div className={styles.Body}>
                        {props.flight.status === 0 &&
                            <div className={styles.NotPublished}>
                                <Alert
                                    title={'Lennupakkumine ei ole avalikustatud!'}
                                    type={'warning'} />
                            </div>
                        }

                        {renderBody(props.flight.body)}
                    </div>

                    <div className={styles.SidebarShow}>
                        <div className={styles.AddNewOffer}>
                            <Button title={'Lisa uus pakkumine'} route={'/'} />
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
    let url = process.env.API_BASE_URL + '/flight/' + slug

    const response = await ApiClientSSR(context).get(url)
    const data = {
        flight: response.data.flight
    }

    return {
        props: data
    }
}

export default FlightOfferShow