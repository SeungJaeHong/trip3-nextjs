import React, { Fragment, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Destination, FlightContent, Tag as TagType } from '../../../types'
import Header from '../../../components/Header'
import styles from '../FlightOfferPage.module.scss'
import containerStyle from '../../../styles/containers.module.scss'
import Tag from '../../../components/Tag'
import clsx from 'clsx'
import Footer from '../../../components/Footer'
import parse from 'html-react-parser'
import FlightMap from '../../../components/FlightMap'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import Alert from '../../../components/Alert'
import { useUser } from '../../../hooks'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { publishFlight } from '../../../services/flight.service'
import FlightOffersLatest from '../../../components/FlightOffer/FlightOffersLatest'
import RelatedContentBlock from '../../../components/RelatedContentBlock'
import Ads from '../../../components/Ads'
import { NextSeo } from 'next-seo'

type Props = {
    flightObj: FlightContent
}

const FlightOfferShow = ({ flightObj }: Props) => {
    const [flight, setFlight] = useState<FlightContent>(flightObj)
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const router = useRouter()

    useEffect(() => {
        setFlight(flightObj)
    }, [flightObj])

    const publish = (status: boolean) => {
        publishFlight(flight.id, status)
            .then((res) => {
                setFlight({ ...flight, status: status ? 1 : 0 })
                toast.success(status ? 'Pakkumine avalikustatud' : 'Pakkumine peidetud')
            })
            .catch((e) => {})
    }

    const renderBody = (htmlString: string) => {
        return parse(htmlString, {
            /*replace: (domNode: any) => {
                if (domNode.name === 'flightmap') {
                    return <FlightMap />
                }
            },*/
        })
    }

    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | Lennupakkumised'}
                description={flight.description}
                openGraph={{
                    title: flight.title,
                    description: flight.description,
                    images: [
                        {
                            url: flight.socialImgUrl,
                            width: 1024,
                            height: undefined,
                            type: undefined
                        },
                    ],
                }}
            />
            <Header backgroundImage={flight.backgroundImageUrl}>
                <div className={clsx(containerStyle.CenteredContainer, styles.HeaderContainer)}>
                    <div className={styles.HeaderTitle}>{flight.title}</div>
                    <div className={styles.HeaderDate}>{flight.createdAt}</div>
                    <div className={styles.Tags}>
                        {flight.destinations?.map((destination: Destination) => {
                            return (
                                <Tag
                                    title={destination.name}
                                    type={'destination'}
                                    route={'/sihtkoht/' + destination.slug}
                                    large={true}
                                    key={destination.id}
                                />
                            )
                        })}
                        {flight.tags?.map((tag: TagType) => {
                            return <Tag title={tag.name} large={true} key={tag.id} white={true} />
                        })}
                    </div>
                    {userIsAdmin && (
                        <div className={styles.ActionButtons}>
                            <div
                                className={styles.ActionButton}
                                onClick={() => router.push('/odavad-lennupiletid/' + flight.id + '/muuda')}
                            >
                                Muuda
                            </div>
                            <div
                                className={clsx(styles.ActionButton, styles.Hide)}
                                onClick={() => publish(!Boolean(flight.status))}
                            >
                                {flight.status === 0 ? 'Avalikusta' : 'Peida'}
                            </div>
                        </div>
                    )}
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.ContentContainer}>
                    <div className={styles.BodyContainer}>
                        <div className={styles.Body}>
                            <Ads type={'body'} className={styles.TopAd} />
                            <div className={styles.Text}>
                                {flight.status === 0 && (
                                    <div className={styles.NotPublished}>
                                        <Alert title={'Lennupakkumine ei ole avalikustatud!'} type={'warning'} />
                                    </div>
                                )}

                                {renderBody(flight.body)}
                            </div>
                        </div>
                        <div className={styles.MoreFlightOffers}>
                            <FlightOffersLatest title={'Veel soodsaid lennupileteid'} excludeId={flight.id} />
                        </div>
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.Ads}>
                            <Ads type={'sidebar-small'} />
                            <Ads type={'sidebar-large'} />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedContentBlock type={'flight'} />
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const slug = context.query.id
        let url = process.env.API_BASE_URL + '/flight/' + slug
        const response = await ApiClientSSR(context).get(url)
        return {
            props: {
                flightObj: response.data,
            },
        }
    } catch (e: any) {
        if (e?.response?.status === 500) {
            return {
                redirect: {
                    destination: '/500',
                    permanent: false,
                },
            }
        } else {
            return {
                notFound: true,
            }
        }
    }
}

export default FlightOfferShow
