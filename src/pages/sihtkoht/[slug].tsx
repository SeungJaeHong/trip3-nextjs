import React, {Fragment} from 'react'
import axios from 'axios'
import {GetServerSideProps} from 'next'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import styles from "./DestinationPage.module.scss"
import containerStyle from "../../styles/containers.module.scss"
import MoreLink from "../../components/MoreLink"
import Image from 'next/image'
import ImageGallery from "../../components/ImageGallery"
import DottedMapIcon from "../../icons/DottedMapIcon"
import {DestinationContent, ForumRowType} from "../../types"
import Link from "next/link"

type Props = {
    destination: DestinationContent
    forumPosts?: ForumRowType[]
}

const DestinationPage = (props: Props) => {
    return (
        <Fragment>
            <Header backgroundImage={'https://trip.ee/images/large/Ateena-acropolis-px_kfwx.jpeg'}>
                <div className={styles.HeaderContainer}>
                    {
                        props.destination.previousDestination ?
                            <Link href={'/sihtkoht/' + props.destination.previousDestination.slug}>
                                <a className={styles.NextDestination}>‹ {props.destination.previousDestination.name}</a>
                            </Link> : null
                    }
                    <div className={styles.DestinationName}>
                        {props.destination.name}
                        {props.destination.parentDestination?.name &&
                        <Link href={'/sihtkoht/' + props.destination.parentDestination.slug}>
                            <a className={styles.ParentDestinationName}>
                                {props.destination.parentDestination.name} ›
                            </a>
                        </Link>
                        }
                    </div>
                    {
                        props.destination.nextDestination ?
                            <Link href={'/sihtkoht/' + props.destination.nextDestination.slug}>
                                <a className={styles.NextDestination}>{props.destination.nextDestination.name} ›</a>
                            </Link> : null
                    }
                </div>
            </Header>
            <div className={styles.YellowContainer}>
                <div className={containerStyle.ContainerXl}>
                    <div className={styles.DataContainer}>
                        <div className={styles.FlightOffersBlock}>
                            <div className={styles.FlightOffersHeader}>
                                <span className={styles.Title}>Head pakkumised</span>
                                <MoreLink route={'/odavad-lennupiletid'} title={'Veel ›'} noSvg={true} />
                            </div>
                            <div className={styles.FlightOfferCard}>
                                <Image
                                    src={'https://trip.ee/images/medium/florian-wehde-WBGjg0DsO_g-unsplash_mljo.jpeg'}
                                    alt="Picture of the author"
                                    layout={'fill'}
                                    objectFit={'cover'}/>
                                <div className={styles.CardBackgroundLayer}>
                                    <span className={styles.FlightOfferTitle}>
                                        Edasi-tagasi lennupiletid Tallinnast Madriidi alates 110€
                                    </span>
                                </div>
                            </div>
                            <div className={styles.FlightOfferCard}>
                                <Image
                                    src={'https://trip.ee/images/medium/venice-3183168_960_720_9sr0.jpeg'}
                                    alt="Picture of the author"
                                    layout={'fill'}
                                    objectFit={'cover'}/>
                                <div className={styles.CardBackgroundLayer}>
                                    <span className={styles.FlightOfferTitle}>
                                        Edasi-tagasi lennupiletid Tallinnast Madriidi alates 110€
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.MetaDataBlock}>
                            <div className={styles.InfoContainer}>
                                <table className={styles.InfoTable}>
                                    <tbody>
                                    <tr>
                                        <td className={styles.TableRowKey}>Suunakood</td>
                                        <td>+93</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TableRowKey}>Valuuta</td>
                                        <td>EUR</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TableRowKey}>Rahvaarv</td>
                                        <td>1 464 000</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TableRowKey}>Ajavöönd</td>
                                        <td>GMT + 1</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className={styles.Description}>
                                    1,5 miljoni elanikuga Baierimaa pealinna Münchenit hinnatakse parima elukvaliteediga linnaks tervel Saksamaal.
                                    Sellele võib muidugi vastu vaielda, sest Müncheni lähedal leidub... <span className={styles.ReadMore}>Loe edasi ›</span>
                                </div>
                            </div>
                            <div className={styles.Map}>
                                <DottedMapIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ImageGallery images={[]} />
            </div>
            <div className={styles.RelatedContent}>
                Content
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.query.slug
    const url = process.env.API_BASE_URL + '/destination/' + slug
    const response = await axios.get(url)
    const data = {
        user: response.data.user,
        destination: response.data.destination
    }

    return {
        props: data
    }
}

export default DestinationPage