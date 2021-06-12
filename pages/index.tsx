import {useUser} from "../context/AuthContext"
import React from 'react'
import Link from 'next/link'
import Navbar from "../components/Navbar"
import FrontPageSearch from "../components/FrontPageSearch"
import containerStyle from '../styles/containers.module.scss'
import styles from './Homepage.module.scss'
import clsx from 'clsx'
import FlightOfferCard from "../components/FlightOffer/FlightOfferCard";
import MoreLink from "../components/MoreLink";
import BlockTitle from "../components/BlockTitle";
import ForumList from "../components/Forum/ForumList";
import Button from "../components/Button";
import NewsCard from "../components/NewsCard";
import ShortNewsListItem from "../components/ShortNewsListItem";
import ImageGallery from "../components/ImageGallery";

const Home = () => {
    const user = useUser()

    //todo: refactor to more components
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
                            <FlightOfferCard content={'test'} color={'#8b84d7'} />
                        </div>
                        <div className={styles.FlightOfferCard}>
                            <FlightOfferCard content={'test'} color={'#f5b800'} />
                        </div>
                        <div className={styles.FlightOfferCard}>
                            <FlightOfferCard content={'test'} color={'#ed6464'} />
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
                        <div className={styles.ForumBlock}>
                            <div className={styles.ForumBlockTitle}>
                                <BlockTitle title={'Tripikad räägivad'} route={'/'} />
                            </div>
                            <div className={styles.ForumList}>
                                <ForumList items={[]} />
                            </div>
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

                <div className={styles.NewsContainer}>
                    <BlockTitle title={'Uudised'} route={'/'} />
                    <div className={styles.News}>
                        <div className={styles.NewsCard}>
                            <NewsCard />
                        </div>
                        <div className={styles.NewsCard}>
                            <NewsCard />
                        </div>
                        <div className={styles.NewsCard}>
                            <NewsCard />
                        </div>
                    </div>
                    <div className={styles.ShortNews}>
                        <div className={styles.NewsCard}>
                            <NewsCard />
                        </div>
                        <div className={styles.ShortNewsList}>
                            <div className={styles.ShortNewsListItem}>
                                <ShortNewsListItem
                                    title={'Helsingi Vantaa lennujaamas on vaid 1200 lendajat päevas'}
                                    date={'Täna 12:42'} />
                            </div>
                            <div className={styles.ShortNewsListItem}>
                                <ShortNewsListItem
                                    title={'Eesti peatab ajutiselt lennuliikluse Ühendkuningriigiga (ERR)'}
                                    date={'Eile 15:46'} />
                            </div>
                            <div className={styles.ShortNewsListItem}>
                                <ShortNewsListItem
                                    title={'Eestisse saab liikumispiiranguta 21 Euroopa riigist'}
                                    date={'3. mai 18:44'} />
                            </div>
                            <div className={styles.ShortNewsListItem}>
                                <ShortNewsListItem
                                    title={'Sitsiilia pakub reisimiseks turismivautšereid'}
                                    date={'1. mai 11:23'} />
                            </div>
                        </div>
                    </div>
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
                            </div>
                            <div className={styles.TravelmateFlightBlock}>
                                <BlockTitle title={'Reisikaaslased'} route={'/'} />
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Home
