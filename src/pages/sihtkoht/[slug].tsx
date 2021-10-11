import React, {Fragment, useState} from 'react'
import {GetServerSideProps} from 'next'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import styles from "./DestinationPage.module.scss"
import containerStyle from "../../styles/containers.module.scss"
import MoreLink from "../../components/MoreLink"
import Image from 'next/image'
import ImageGallery from "../../components/ImageGallery"
import {Destination, DestinationContent} from "../../types"
import Link from "next/link"
import Tag from "../../components/Tag"
import PinIcon from "../../icons/PinIcon"
import StarIcon from "../../icons/StarIcon"
import ForumList from "../../components/Forum/ForumList"
import BlockTitle from "../../components/BlockTitle"
import ApiClientSSR from "../../lib/ApiClientSSR"
import DotMap from "../../components/DotMap"

type Props = {
    destination: DestinationContent
}

const DestinationPage = (props: Props) => {
    const destination = props.destination
    const [showMore, setShowMore] = useState(false)
    const renderChildDestinations = () => {
        if (!destination.childDestinations?.length) {
            return null
        }

        return (
            <div className={styles.MoreDestinations}>
                <div className={styles.PopularDestinationTitle}>
                    Populaarsed sihtkohad
                </div>
                <div className={styles.ChildDestinations}>
                    {destination.childDestinations?.map((d: Destination) => {
                        return <Tag
                            title={d.name}
                            type={'destination'}
                            route={'/sihtkoht/' + d.slug}
                            white={true}
                            large={true}
                            key={d.id} />
                    })}
                </div>
            </div>
        )
    }

    const renderDescription = () => {
        if (destination.description?.length) {
            return (
                <div className={styles.Description}>
                    {showMore ? destination.description : destination.descriptionPreview}
                    <span className={styles.ReadMore} onClick={() => setShowMore(!showMore)}>{showMore ? 'Loe vähem ›' : 'Loe edasi ›'}</span>
                </div>
            )
        }

        return null
    }

    return (
        <Fragment>
            <Header backgroundImage={'https://trip.ee/images/large/Ateena-acropolis-px_kfwx.jpeg'}>
                <div className={styles.HeaderContainer}>
                    {
                        destination.previousDestination ?
                            <Link href={'/sihtkoht/' + destination.previousDestination.slug}>
                                <a className={styles.NextDestination}>‹ {destination.previousDestination.name}</a>
                            </Link> : <span className={styles.NextDestination}></span>
                    }
                    <div className={styles.DestinationName}>
                        {destination.name}
                        {destination.parentDestination?.name &&
                        <Link href={'/sihtkoht/' + destination.parentDestination.slug}>
                            <a className={styles.ParentDestinationName}>
                                {destination.parentDestination.name} ›
                            </a>
                        </Link>
                        }
                    </div>
                    {
                        destination.nextDestination ?
                            <Link href={'/sihtkoht/' + destination.nextDestination.slug}>
                                <a className={styles.NextDestination}>{destination.nextDestination.name} ›</a>
                            </Link> : <span className={styles.NextDestination}></span>
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
                            {
                                destination.flights?.map(flight => {
                                    return (
                                        <Link href={'/odavad-lennupiletid/' + flight.slug} key={flight.id}>
                                            <a className={styles.FlightOfferCard}>
                                                <Image
                                                    src={flight.imageUrl}
                                                    alt=""
                                                    layout={'fill'}
                                                    objectFit={'cover'}/>
                                                <div className={styles.CardBackgroundLayer}>
                                                <span className={styles.FlightOfferTitle}>
                                                    {flight.title}
                                                </span>
                                                </div>
                                            </a>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.MetaDataBlock}>
                            <div className={styles.InfoContainer}>
                                <table className={styles.InfoTable}>
                                    <tbody>
                                    <tr>
                                        <td className={styles.TableRowKey}>Suunakood</td>
                                        <td>{destination.facts?.phoneCode}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TableRowKey}>Valuuta</td>
                                        <td>{destination.facts?.currency}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TableRowKey}>Rahvaarv</td>
                                        <td>{destination.facts?.population}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TableRowKey}>Ajavöönd</td>
                                        <td>{destination.facts?.timezone}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                {renderDescription()}

                            </div>
                            <div className={styles.Map}>
                                <DotMap destination={destination} />
                            </div>
                        </div>
                    </div>

                    {renderChildDestinations()}

                    <div className={styles.HaveBeenBlock}>
                        <div className={styles.BlockItem}>
                            <PinIcon />
                            <span>{destination.usersHaveBeen || 0}</span>
                        </div>
                        <div className={styles.BlockItem}>
                            <StarIcon />
                            <span>{destination.usersWantsToGo || 0}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <ImageGallery images={[]} />
            </div>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.RelatedContent}>
                    <div className={styles.ForumContent}>
                        <BlockTitle title={'Tripikad räägivad'} className={styles.ForumBlockTitle} />
                        <ForumList items={destination.forumPosts} />
                        <div className={styles.MoreForumLink}>
                            <MoreLink route={'/foorum/uldfoorum'} title={'Kõik positused'} />
                        </div>
                    </div>
                    <div className={styles.AdsContent}>
                        Ads
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.query.slug
    const url = process.env.API_BASE_URL + '/destination/' + slug
    const response = await ApiClientSSR(context).get(url)
    const data = {
        destination: response.data.destination
    }

    return {
        props: data
    }
}

export default DestinationPage