import React, {Fragment, useState} from 'react'
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
import Tag from "../../components/Tag"
import PinIcon from "../../icons/PinIcon"
import StarIcon from "../../icons/StarIcon"

type Props = {
    destination: DestinationContent
    forumPosts?: ForumRowType[]
}

const DestinationPage = (props: Props) => {
    const [showMore, setShowMore] = useState(false)
    const renderChildDestinations = () => {
        if (!props.destination.childDestinations?.length) {
            return null
        }

        return (
            <div className={styles.MoreDestinations}>
                <div className={styles.PopularDestinationTitle}>
                    Populaarsed sihtkohad
                </div>
                <div className={styles.ChildDestinations}>
                    {props.destination.childDestinations?.map(destination => {
                        return <Tag
                            title={destination.name}
                            type={'destination'}
                            route={'/sihtkoht/' + destination.slug}
                            white={true}
                            large={true}
                            key={destination.id} />
                    })}
                </div>
            </div>
        )
    }

    const renderDescription = () => {
        if (props.destination.description?.length) {
            return (
                <div className={styles.Description}>
                    {showMore ? props.destination.description : props.destination.descriptionPreview}
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
                        props.destination.previousDestination ?
                            <Link href={'/sihtkoht/' + props.destination.previousDestination.slug}>
                                <a className={styles.NextDestination}>‹ {props.destination.previousDestination.name}</a>
                            </Link> : <span className={styles.NextDestination}></span>
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
                                props.destination.flights?.map(flight => {
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
                                        <td>{props.destination.facts?.phoneCode}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TableRowKey}>Valuuta</td>
                                        <td>{props.destination.facts?.currency}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TableRowKey}>Rahvaarv</td>
                                        <td>{props.destination.facts?.population}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.TableRowKey}>Ajavöönd</td>
                                        <td>{props.destination.facts?.timezone}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                {renderDescription()}

                            </div>
                            <div className={styles.Map}>
                                <DottedMapIcon />
                            </div>
                        </div>
                    </div>

                    {renderChildDestinations()}

                    <div className={styles.HaveBeenBlock}>
                        <div className={styles.BlockItem}>
                            <PinIcon />
                            <span>{props.destination.usersHaveBeen || 0}</span>
                        </div>
                        <div className={styles.BlockItem}>
                            <StarIcon />
                            <span>{props.destination.usersWantsToGo || 0}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <ImageGallery images={[]} />
            </div>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.RelatedContent}>
                    Content
                </div>
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