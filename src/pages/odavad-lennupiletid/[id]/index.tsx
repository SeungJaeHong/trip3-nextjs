import React, { Fragment, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import {ContentMarketingPost, Destination, FlightContent, Tag as TagType} from '../../../types'
import Header from '../../../components/Header'
import styles from '../FlightOfferPage.module.scss'
import containerStyle from '../../../styles/containers.module.scss'
import Tag from '../../../components/Tag'
import clsx from 'clsx'
import Footer from '../../../components/Footer'
import parse from 'html-react-parser'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import Alert from '../../../components/Alert'
import {useIsMounted, useUser} from '../../../hooks'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import {getContentMarketingPosts, makeFlightSticky, publishFlight} from '../../../services/flight.service'
import FlightOffersLatest from '../../../components/FlightOffer/FlightOffersLatest'
import RelatedContentBlock from '../../../components/RelatedContentBlock'
import { NextSeo } from 'next-seo'
import dynamic from "next/dynamic"
import ContentMarketingSlider from "../../../components/ContentMarketing/Slider/ContentMarketingSlider";

const Ads = dynamic(() => import('../../../components/Ads'), { ssr: false })

type Props = {
    flightObj: FlightContent
}

const FlightOfferShow = ({ flightObj }: Props) => {
    const [flight, setFlight] = useState<FlightContent>(flightObj)
    const [contentMarketingPosts, setContentMarketingPosts] = useState<ContentMarketingPost[]>([])
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const router = useRouter()
    const isMounted = useIsMounted()

    useEffect(() => {
        setFlight(flightObj)
        getContentMarketingPosts().then(res => {
            if (isMounted()) {
                setContentMarketingPosts(res.data)
            }
        }).catch(e => {

        })
    }, [flightObj])

    const publish = (status: boolean) => {
        publishFlight(flight.id, status)
            .then((res) => {
                setFlight({ ...flight, status: status ? 1 : 0 })
                toast.success(status ? 'Pakkumine avalikustatud' : 'Pakkumine peidetud')
            })
            .catch((e) => {})
    }

    const makeSticky = (status: boolean) => {
        makeFlightSticky(flight.id, status)
            .then((res) => {
                setFlight({ ...flight, sticky: status })
                toast.success(status ? 'Sticky lisatud' : 'Sticky eemaldatud')
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
            <Header backgroundImage={flight.backgroundImageUrl ? flight.backgroundImageUrl : '/images/header.webp'}>
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
                                className={styles.ActionButton}
                                onClick={() => publish(!Boolean(flight.status))}
                            >
                                {flight.status === 0 ? 'Avalikusta' : 'Peida'}
                            </div>
                            <div
                                className={styles.ActionButton}
                                onClick={() => makeSticky(!Boolean(flight.sticky))}
                            >
                                {!flight.sticky ? 'Lisa sticky' : 'Eemalda sticky'}
                            </div>
                        </div>
                    )}
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.ContentContainer}>
                    <div className={styles.BodyContainer}>
                        <div className={styles.Body}>
                            <div className={styles.BodyAd}>
                                <Ads type={'mobile_320x200'} className={styles.TopAd} />
                                <Ads type={'desktop_body'} />
                            </div>
                            <div className={styles.Text}>
                                {flight.status === 0 && (
                                    <div className={styles.NotPublished}>
                                        <Alert title={'Lennupakkumine ei ole avalikustatud!'} type={'warning'} />
                                    </div>
                                )}

                                {renderBody(flight.body)}
                            </div>
                        </div>
                        <div className={styles.Ads}>
                            <Ads type={'mobile_320x200_2'} />
                        </div>
                        <div className={styles.MoreFlightOffers}>
                            <FlightOffersLatest title={'Veel soodsaid lennupileteid'} excludeId={flight.id} />
                        </div>
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.Ads}>
                            <Ads type={'desktop_sidebar_small'} />
                            {contentMarketingPosts.length > 0 && <div className={styles.ContentMarketingSlider}><ContentMarketingSlider posts={contentMarketingPosts} /></div>}
                            <Ads type={'desktop_sidebar_large'} />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedContentBlock type={'flight'} ad={'mobile_320x200_3'}/>
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
