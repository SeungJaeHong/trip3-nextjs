import {useUser} from "../context/AuthContext"
import React from 'react'
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
                    <div className={styles.ForumBlock}>
                        <div className={styles.ForumBlockTitle}>
                            <BlockTitle title={'Tripikad räägivad'} route={'/'} />
                        </div>
                        <div className={styles.ForumList}>
                            <ForumList items={[]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
