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

type Props = {
    user: UserProfile
}

const UserPage = ({user}: Props) => {

    //console.log(user)

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
                                Saada sõnum
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
                        {/*<div>
                            Continents
                        </div>*/}
                    </div>
                </div>
            </div>
            <div className={styles.ImageGallery}>
                <ImageGallery images={[]} />
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