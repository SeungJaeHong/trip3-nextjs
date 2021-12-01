import React, {Fragment, useState} from 'react'
import {GetServerSideProps} from 'next'
import styles from "./UserPage.module.scss"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import {UserProfile} from "../../types"
import ApiClientSSR from "../../lib/ApiClientSSR"
import containerStyle from "../../styles/containers.module.scss"
import UserProfileAvatar from "../../components/User/UserProfileAvatar"
import DottedMapIcon from "../../icons/DottedMapIcon"
import ThumbsUpIcon from "../../icons/ThumbsUpIcon"
import PostIcon from "../../icons/Admin/PostIcon"
import CommentIcon from "../../icons/CommentIcon"
import ThumbsDownIcon from "../../icons/ThumbsDownIcon"
import ImageGallery from "../../components/ImageGallery"
import PinIcon from "../../icons/PinIcon"
import StarIcon from "../../icons/StarIcon"
import Tag from "../../components/Tag"
import BlockTitle from "../../components/BlockTitle"
import UserLastComments from "../../components/User/UserLastComments"

type Props = {
    user: UserProfile
}

const UserPage = ({user}: Props) => {

    //console.log(user)

    const showVisitedBlock = (user.countriesVisited && user.countriesVisited?.length > 0)
        || (user.citiesVisited && user.citiesVisited?.length > 0)

    return (
        <Fragment>
            <Header
                backgroundImage={'/images/user_page_bg.jpg'}
                className={styles.Header}
                style={{backgroundPosition: '50% 25%'}} />
            <div className={styles.BodyContainer}>
                <div className={containerStyle.ContainerLg}>
                    <div className={styles.Body}>
                        <div className={styles.BackGroundMap}>
                            <DottedMapIcon />
                        </div>
                        <div className={styles.Avatar}>
                            <UserProfileAvatar {...user} />
                        </div>
                        <div className={styles.UserNameContainer}>
                            <div className={styles.UserName}>
                                {user.name}
                            </div>
                            <div className={styles.MessageButton}>
                                <span>Saada sõnum</span>
                            </div>
                        </div>
                        <div className={styles.Joined}>
                            Liitus Tripiga {user.joinedDate}
                        </div>
                        <div className={styles.Statistics}>
                            <div className={styles.StatisticsItem}>
                                <ThumbsUpIcon />
                                <span className={styles.StatisticsLabel}>
                                    {user.liked} meeldimist
                                </span>
                            </div>
                            <div className={styles.StatisticsItem}>
                                <ThumbsDownIcon />
                                <span className={styles.StatisticsLabel}>
                                    {user.disliked} mittemeeldimist
                                </span>
                            </div>
                            <div className={styles.StatisticsItem}>
                                <PostIcon />
                                <span className={styles.StatisticsLabel}>
                                    {user.postCount} postitust
                                </span>
                            </div>
                            <div className={styles.StatisticsItem}>
                                <CommentIcon />
                                <span className={styles.StatisticsLabel}>
                                    {user.commentCount} kommentaari
                                </span>
                            </div>
                        </div>

                        {showVisitedBlock &&
                            <div className={styles.VisitedBlock}>
                                <div className={styles.VisitedHeader}>
                                    On külastanud:
                                </div>
                                {/*{(user.continentsVisited && user.continentsVisited?.length > 0) &&
                                    <div className={styles.DestinationInfo}>
                                        <div className={styles.Info}>
                                            <PinIcon />
                                            <div className={styles.InfoTitle}>
                                                {user.continentsVisited.length} kontinenti
                                            </div>
                                        </div>
                                        <div className={styles.Tags}>
                                            {user.continentsVisited.map(destination => {
                                                return <Tag title={destination.name} large={true} white={true} route={'/sihtkoht/' + destination.slug} key={destination.id} />
                                            })}
                                        </div>
                                    </div>
                                }*/}
                                {(user.countriesVisited && user.countriesVisited?.length > 0) &&
                                    <div className={styles.DestinationInfo}>
                                        <div className={styles.Info}>
                                            <PinIcon />
                                            <div className={styles.InfoTitle}>
                                                {user.countriesVisited.length} riiki ({user.countryPercentage}%)
                                            </div>
                                        </div>
                                        <div className={styles.Tags}>
                                            {user.countriesVisited.map(destination => {
                                                return <Tag title={destination.name} large={true} white={true} route={'/sihtkoht/' + destination.slug} key={destination.id} />
                                            })}
                                        </div>
                                    </div>
                                }
                                {(user.citiesVisited && user.citiesVisited?.length > 0) &&
                                    <div className={styles.DestinationInfo}>
                                        <div className={styles.Info}>
                                            <PinIcon />
                                            <div className={styles.InfoTitle}>
                                                {user.citiesVisited.length} linna või piirkonda
                                            </div>
                                        </div>
                                        <div className={styles.Tags}>
                                            {user.citiesVisited.map(destination => {
                                                return <Tag title={destination.name} large={true} white={true} route={'/sihtkoht/' + destination.slug} key={destination.id} />
                                            })}
                                        </div>
                                    </div>
                                }
                            </div>
                        }

                        {(user.wantsToGo && user.wantsToGo?.length > 0) &&
                            <>
                                <div className={styles.VisitedHeader}>
                                    Tahab minna:
                                </div>
                                <div className={styles.DestinationInfo}>
                                    <div className={styles.Info}>
                                        <StarIcon />
                                        <div className={styles.InfoTitle}>
                                            {user.wantsToGo.length} sihtkohta
                                        </div>
                                    </div>
                                    <div className={styles.Tags}>
                                        {user.wantsToGo.map(destination => {
                                            return <Tag title={destination.name} large={true} white={true} route={'/sihtkoht/' + destination.slug} key={destination.id} />
                                        })}
                                    </div>
                                </div>
                            </>
                        }

                    </div>
                </div>
            </div>
            <div className={styles.ImageGallery}>
                <ImageGallery images={[]} />
            </div>
            <div className={styles.ForumPosts}>
                <div className={containerStyle.ContainerXl}>
                    <div className={styles.ContainerBody}>
                        <div className={styles.ForumList}>
                            <div className={styles.ForumListTitle}>
                                <BlockTitle title={'Viimased kommentaarid'} />
                            </div>
                            <div className={styles.UserLastComments}>
                                <UserLastComments {...user} />
                            </div>
                        </div>
                        <div className={styles.Sidebar}>
                            Sidebar
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id
    const url = process.env.API_BASE_URL + '/user/' + id
    const response = await ApiClientSSR(context).get(url)

    if (!response.data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            user: response.data
        }
    }
}

export default UserPage