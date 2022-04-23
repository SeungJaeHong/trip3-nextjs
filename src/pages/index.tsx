import { GetServerSideProps } from 'next'
import Navbar from '../components/Navbar'
import FrontPageSearch from '../components/FrontPageSearch'
import containerStyle from '../styles/containers.module.scss'
import styles from './Homepage.module.scss'
import clsx from 'clsx'
import MoreLink from '../components/MoreLink'
import BlockTitle from '../components/BlockTitle'
import ForumList from '../components/Forum/ForumList'
import Button from '../components/Button'
import FlightOfferCard from '../components/FlightOffer/FlightOfferCard'
import Footer from '../components/Footer'
import { FlightOfferCardType, ForumRowType } from '../types'
import NewsLatest from '../components/News/NewsLatest'
import FlightOffersLatest from '../components/FlightOffer/FlightOffersLatest'
import TravelmatesLatest from '../components/Travelmate/TravelmatesLatest'
import ApiClientSSR from '../lib/ApiClientSSR'
import useUser from '../hooks'
import FrontPageImageGallery from '../components/FrontPageImageGallery'
import Ads from '../components/Ads'
import React from 'react'

type Props = {
    flightOffers: FlightOfferCardType[]
    forumPosts: ForumRowType[]
}

const Home = ({ flightOffers, forumPosts }: Props) => {
    const { userIsLoggedIn } = useUser()
    return (
        <>
            <div
                className={styles.Header}
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(/images/header6.jpg)',
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%',
                }}
            >
                <div className={clsx([containerStyle.ContainerXl, styles.Content])}>
                    <div className={styles.Navbar}>
                        <Navbar />
                    </div>
                    <div className={styles.Search}>
                        <FrontPageSearch />
                    </div>
                </div>
            </div>
            <div className={clsx([containerStyle.ContainerXl, styles.Content])}>
                <div className={styles.CenteredContainer}>
                    <div className={styles.FlightOffers}>
                        <div className={styles.FlightOfferCard}>
                            <FlightOfferCard {...flightOffers[0]} color={'purple'} />
                        </div>
                        <div className={styles.FlightOfferCard}>
                            <FlightOfferCard {...flightOffers[1]} color={'yellow'} />
                        </div>
                        <div className={styles.FlightOfferCard}>
                            <FlightOfferCard {...flightOffers[2]} color={'red'} />
                        </div>
                    </div>
                    <div
                        className={clsx(styles.MoreFlightsLink, {
                            [styles.UserLoggedIn]: userIsLoggedIn,
                        })}
                    >
                        <MoreLink title={'Vaata kõiki lennupakkumisi'} route={'/odavad-lennupiletid'} />
                    </div>

                    {!userIsLoggedIn && (
                        <div className={styles.JoinTripBlock}>
                            <div className={styles.TripDescription}>
                                <span className={styles.DescriptionText}>
                                    Trip.ee on reisihuviliste kogukond, keda ühendab reisipisik ning huvi kaugete maade
                                    ja kultuuride vastu.
                                </span>
                                <MoreLink title={'Loe lähemalt Trip.ee-st'} route={'/tripist'} />
                            </div>
                            <div className={styles.JoinButton}>
                                <Button title={'Liitu Trip.ee-ga'} route={'/register'} />
                            </div>
                        </div>
                    )}

                    <div className={styles.ForumContainer}>
                        <div className={styles.ForumBlockTitle}>
                            <BlockTitle title={'Tripikad räägivad'} />
                        </div>
                        <div className={styles.ForumBlock}>
                            <div className={styles.ForumList}>
                                <ForumList items={forumPosts} withAds={true} />
                            </div>
                            <div className={styles.SidebarContent}>
                                <div className={styles.ForumLinks}>
                                    <div className={styles.ForumLink}>
                                        <MoreLink title={'Üldfoorum'} route={'/foorum/uldfoorum'} large={true} />
                                        <span className={styles.ForumDescription}>
                                            Eesti suurim reisifoorum. Küsi siin oma küsimus või jaga häid soovitusi
                                        </span>
                                    </div>
                                    <div className={styles.ForumLink}>
                                        <MoreLink title={'Ost-müük'} route={'/foorum/ost-muuk'} large={true} />
                                        <span className={styles.ForumDescription}>
                                            Lennupiletite, reisivarustuse ja muu reisimiseks vajaliku ost ja müük
                                        </span>
                                    </div>
                                    <div className={styles.ForumLink}>
                                        <MoreLink
                                            title={'Elu välismaal'}
                                            route={'/foorum/elu-valismaal'}
                                            large={true}
                                        />
                                        <span className={styles.ForumDescription}>
                                            Küsimused välismaal elavatelt eestlastelt
                                        </span>
                                    </div>
                                </div>
                                {userIsLoggedIn && (
                                    <div className={styles.AddNewTopic}>
                                        <Button title={'Alusta uut teemat'} route={'/foorum/lisa-uus'} />
                                    </div>
                                )}
                                <div className={styles.Ads}>
                                    <Ads type={'sidebar-small'} />
                                    <Ads type={'sidebar-large'} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.ViewMoreForumPosts}>
                            <MoreLink route={'/foorum/uldfoorum'} title={'Kõik postitused'} />
                        </div>
                    </div>
                </div>
                <div className={styles.NewsContainer}>
                    <NewsLatest take={6} />
                </div>
                <BlockTitle title={'Viimati lisatud pildid'} />
            </div>

            <div className={styles.ImageGalleryContainer}>
                <div className={styles.ImageGallery}>
                    <FrontPageImageGallery />
                </div>
            </div>

            <div className={styles.BottomContainer}>
                <div className={clsx([containerStyle.ContainerXl, styles.Content])}>
                    <div className={styles.TravelFlightContainer}>
                        <div className={styles.TravelmateFlightBlock}>
                            <FlightOffersLatest take={5} />
                        </div>
                        <div className={clsx(styles.TravelmateFlightBlock, styles.Travelmates)}>
                            <TravelmatesLatest take={5} />
                        </div>
                    </div>
                    <div className={styles.FooterAds}>
                        <Ads type={'footer'} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = {
        flightOffers: [],
        forumPosts: [],
    }

    try {
        const res = await ApiClientSSR(context).get('/frontpage')
        data.flightOffers = res.data.flightOffers
        data.forumPosts = res.data.forumPosts
    } catch (error) {
        //console.error(error)
    }

    return {
        props: data,
    }
}

export default Home
