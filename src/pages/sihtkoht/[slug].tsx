import React, { Fragment, useState } from 'react'
import { GetServerSideProps } from 'next'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from './DestinationPage.module.scss'
import containerStyle from '../../styles/containers.module.scss'
import MoreLink from '../../components/MoreLink'
import Image from 'next/image'
import { Destination, DestinationContent } from '../../types'
import Link from 'next/link'
import Tag from '../../components/Tag'
import PinIcon from '../../icons/PinIcon'
import StarIcon from '../../icons/StarIcon'
import ForumList from '../../components/Forum/ForumList'
import BlockTitle from '../../components/BlockTitle'
import ApiClientSSR from '../../lib/ApiClientSSR'
import DestinationImageGallery from '../../components/Destination/DestinationImageGallery'
import RelatedContentBlock from '../../components/RelatedContentBlock'
import { Tooltip } from '@mantine/core'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'

const Ads = dynamic(() => import('../../components/Ads'), { ssr: false })
const DestinationMap = dynamic(() => import('../../components/Destination/DestinationMap'), { ssr: false })

type Props = {
    destination: DestinationContent
}

const DestinationPage = ({ destination }: Props) => {
    //const [showMore, setShowMore] = useState(false)
    const renderChildDestinations = () => {
        if (!destination.childDestinations?.length) {
            return null
        }

        return (
            <div className={styles.MoreDestinations}>
                <div className={styles.PopularDestinationTitle}>Populaarsed sihtkohad</div>
                <div className={styles.ChildDestinations}>
                    {destination.childDestinations?.map((d: Destination) => {
                        return (
                            <Tag
                                title={d.name}
                                type={'destination'}
                                route={'/sihtkoht/' + d.slug}
                                white={true}
                                large={true}
                                key={d.id}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }

    /*const renderDescription = () => {
        if (destination.description?.length) {
            return (
                <div className={styles.Description}>
                    {showMore ? destination.description : destination.descriptionPreview}
                    <span className={styles.ReadMore} onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Loe vähem ›' : 'Loe edasi ›'}
                    </span>
                </div>
            )
        }

        return null
    }*/

    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | ' + destination.name}
                description={
                    destination.name +
                    ': reisiinfo ning ülevaate headest pakkumistest, reisisoovitustest, kuulutustest ja reisikaaslastest'
                }
            />
            <Header backgroundImage={'https://trip3spaces.fra1.cdn.digitaloceanspaces.com/images/content/background/Ateena-acropolis-px_kfwx.jpeg'}>
                <div className={styles.HeaderContainer}>
                    {destination.previousDestination ? (
                        <Link href={'/sihtkoht/' + destination.previousDestination.slug}>
                            <a className={styles.NextDestination}>
                                <span className={styles.Arrow}>‹</span>
                                <span className={styles.NextDestinationName}>
                                    {destination.previousDestination.name}
                                </span>
                            </a>
                        </Link>
                    ) : (
                        <span className={styles.NextDestination} />
                    )}
                    <div className={styles.DestinationName}>
                        {destination.name}
                        {destination.parentDestination?.name && (
                            <Link href={'/sihtkoht/' + destination.parentDestination.slug}>
                                <a className={styles.ParentDestinationName}>{destination.parentDestination.name} ›</a>
                            </Link>
                        )}
                    </div>
                    {destination.nextDestination ? (
                        <Link href={'/sihtkoht/' + destination.nextDestination.slug}>
                            <a className={styles.NextDestination}>
                                <span className={styles.NextDestinationName}>{destination.nextDestination.name}</span>
                                <span className={styles.Arrow}>›</span>
                            </a>
                        </Link>
                    ) : (
                        <span className={styles.NextDestination} />
                    )}
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
                            {destination.flights?.map((flight) => {
                                return (
                                    <Link href={'/odavad-lennupiletid/' + flight.slug} key={flight.id}>
                                        <a className={styles.FlightOfferCard}>
                                            <Image src={flight.imageUrl} alt="" layout={'fill'} objectFit={'cover'} />
                                            <div className={styles.CardBackgroundLayer}>
                                                <span className={styles.FlightOfferTitle}>{flight.title}</span>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            })}
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
                                <div className={styles.Map}>
                                    <DestinationMap destination={destination} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {renderChildDestinations()}

                    <div className={styles.HaveBeenBlock}>
                        <Tooltip label={'On siin käinud'} withArrow>
                            <div className={styles.BlockItem}>
                                <PinIcon />
                                <span>{destination.usersHaveBeen || 0}</span>
                            </div>
                        </Tooltip>

                        <Tooltip label={'Tahab siia minna'} withArrow>
                            <div className={styles.BlockItem}>
                                <StarIcon />
                                <span>{destination.usersWantsToGo || 0}</span>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className={styles.ImageGallery}>
                <div className={styles.ImagesContainer}>
                    <DestinationImageGallery {...destination} />
                </div>
            </div>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.RelatedContent}>
                    <div className={styles.ForumContent}>
                        <BlockTitle title={'Tripikad räägivad'} className={styles.ForumBlockTitle} />
                        <ForumList items={destination.forumPosts || []} withAds={destination.forumPosts && destination.forumPosts?.length > 3} onlyMiddleAd={destination.forumPosts && destination.forumPosts?.length <= 8}/>
                        <div className={styles.MoreForumLink}>
                            <MoreLink route={'/foorum/uldfoorum?destination=' + destination.id} title={'Kõik positused'} />
                        </div>
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.Ads}>
                            <Ads type={'mobile_320x200'} />
                            <Ads type={'desktop_sidebar_small'} />
                            <Ads type={'desktop_sidebar_large'} />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedContentBlock type={'destination'} destinationId={destination.id} />
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const slug = context.query.slug
        const url = process.env.API_BASE_URL + '/destination/' + slug
        const response = await ApiClientSSR(context).get(url)
        return {
            props: {
                destination: response.data,
            },
        }
    } catch (e) {
        return {
            notFound: true,
        }
    }
}

export default DestinationPage
