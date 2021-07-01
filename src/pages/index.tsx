import {GetServerSideProps} from "next"
import Link from 'next/link'
import Navbar from "../components/Navbar"
import FrontPageSearch from "../components/FrontPageSearch"
import containerStyle from '../styles/containers.module.scss'
import styles from './Homepage.module.scss'
import clsx from 'clsx'
import MoreLink from "../components/MoreLink"
import BlockTitle from "../components/BlockTitle";
import ForumList from "../components/Forum/ForumList";
import Button from "../components/Button"
import ImageGallery from "../components/ImageGallery";
import FlightOfferRow from "../components/FlightOffer/FlightOfferRow"
import FlightOfferCard from "../components/FlightOffer/FlightOfferCard"
import TravelmateRow from "../components/TravelmateRow"
import axios from "axios";
import Footer from "../components/Footer"
import ApiClient from "../lib/ApiClient"
import {Content, ForumRowType} from '../types'
import FrontpageNewsBlock from "../components/News/FrontpageNewsBlock"

type Props = {
    flightOffers: Content[],
    forumPosts: ForumRowType[],
}

const Home = (props: Props) => {
    //const user = useUser()

    return (
        <>
            <div className={styles.Header}
                 style={{
                     backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(/images/header6.jpg)",
                     width: "100%",
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "cover",
                     backgroundPosition: "50% 50%"
                }}>
                <div className={clsx([containerStyle.container_xl, styles.Content])}>
                    <div className={styles.Navbar}>
                        <Navbar />
                    </div>
                    <div className={styles.Search}>
                        <FrontPageSearch />
                    </div>
                </div>
            </div>
            <div className={clsx([containerStyle.container_xl, styles.Content])}>
                <div className={styles.CenteredContainer}>
                    <div className={styles.FlightOffers}>
                        <div className={styles.FlightOfferCard}>
                            <FlightOfferCard content={props.flightOffers[0]} color={'#8b84d7'} />
                        </div>
                        <div className={styles.FlightOfferCard}>
                            <FlightOfferCard content={props.flightOffers[1]} color={'#f5b800'} />
                        </div>
                        <div className={styles.FlightOfferCard}>
                            <FlightOfferCard content={props.flightOffers[2]} color={'#FF5050'} />
                        </div>
                    </div>
                    <div className={styles.MoreFlightsLink}>
                        <MoreLink title={'Vaata kõiki sooduspakkumisi'} route={'/'} />
                    </div>
                    <div className={styles.JoinTripBlock}>
                        <div className={styles.TripDescription}>
                            <span className={styles.DescriptionText}>
                                Trip.ee on reisihuviliste kogukond, keda ühendab reisipisik ning huvi kaugete maade ja kultuuride vastu.
                            </span>
                            <MoreLink title={'Loe lähemalt Trip.ee-st'} route={'/'} />
                        </div>
                        <div className={styles.JoinButton}>
                            <Button title={'Liitu Trip.ee-ga'}/>
                        </div>
                    </div>

                    <div className={styles.ForumContainer}>
                        <div className={styles.ForumBlockTitle}>
                            <BlockTitle title={'Tripikad räägivad'} route={'/'} />
                        </div>
                        <div className={styles.ForumBlock}>
                            <div className={styles.ForumList}>
                                <ForumList items={props.forumPosts} />
                            </div>
                            <div className={styles.SidebarContent}>
                                <div className={styles.ForumLinks}>
                                    <div className={styles.ForumLink}>
                                        <MoreLink title={'Üldfoorum'} route={'/'} large={true} />
                                        <span className={styles.ForumDescription}>Eesti suurim reisifoorum. Küsi siin oma küsimus või jaga häid soovitusi</span>
                                    </div>
                                    <div className={styles.ForumLink}>
                                        <MoreLink title={'Ost-müük'} route={'/'} large={true} />
                                        <span className={styles.ForumDescription}>Eesti suurim reisifoorum. Küsi siin oma küsimus või jaga häid soovitusi</span>
                                    </div>
                                    <div className={styles.ForumLink}>
                                        <MoreLink title={'Elu välismaal'} route={'/'} large={true} />
                                        <span className={styles.ForumDescription}>Eesti suurim reisifoorum. Küsi siin oma küsimus või jaga häid soovitusi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.NewsContainer}>
                    <FrontpageNewsBlock />
                </div>

                <BlockTitle title={'Viimati lisatud pildid'} route={'/'} />
            </div>

            <div className={styles.ImageGalleryContainer}>
                <ImageGallery images={[]} />
            </div>

            <div className={styles.BottomContainer}>
                <div className={clsx([containerStyle.container_xl, styles.Content])}>
                    <div className={styles.TravelFlightContainer}>
                        <div className={styles.TravelmateFlightBlock}>
                            <BlockTitle title={'Soodsad lennupiletid'} route={'/'} />
                            <div className={styles.FlightOffersBlock}>
                                <div className={styles.FlightOffersRow}>
                                    <FlightOfferRow title={'Edasi-tagasi lennupiletid suvel Tallinnast Kreetale 173€'} />
                                </div>
                                <div className={styles.FlightOffersRow}>
                                    <FlightOfferRow title={'Otselennud Horvaatiasse: edasi-tagasi lennupiletid Riiast Splitti 108€'} />
                                </div>
                                <div className={styles.FlightOffersRow}>
                                    <FlightOfferRow title={'Edasi-tagasi lennupiletid sügisel Tallinnast Dubaisse al 256€'} />
                                </div>
                                <div className={styles.FlightOffersRow}>
                                    <FlightOfferRow title={'Otselennud suveks: edasi-tagasi lennupiletid Riiast Maltale al 38€'} />
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.TravelmateFlightBlock, styles.Travelmates)}>
                            <BlockTitle title={'Reisikaaslased'} route={'/'} />
                            <div className={styles.TravelmatesBlock}>
                                <div className={styles.TravelmatesRow}>
                                    <TravelmateRow title={'Alates 26.06.21 kuhugile nädalaks reisile?'} />
                                </div>
                                <div className={styles.TravelmatesRow}>
                                    <TravelmateRow title={'Juulis Itaalia (Rooma ja lähiümbrus) või L-Prantsusmaale?'} />
                                </div>
                                <div className={styles.TravelmatesRow}>
                                    <TravelmateRow title={'Kultuur ja puhkus Vahemere või Musta mere ääres juuli või august 21'} />
                                </div>
                                <div className={styles.TravelmatesRow}>
                                    <TravelmateRow title={'Juulis algusega 19.07 - kaheks, kolmeks nädalaks autoga Euroopasse'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const data = {
        user: null,
        flightOffers: [],
        forumPosts: []
    }

    try {
        const res = await ApiClient.get('/frontpage')
        data.user = res.data.user
        data.flightOffers = res.data.flightOffers
        data.forumPosts = res.data.forumPosts
    } catch (error) {
        //console.error(error)
    }

    return {
        props: data
    }
}

export default Home
