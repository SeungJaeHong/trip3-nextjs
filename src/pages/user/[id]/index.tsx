import React, { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import styles from './UserPage.module.scss'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { UserPublicProfile } from '../../../types'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import containerStyle from '../../../styles/containers.module.scss'
import UserProfileAvatar from '../../../components/User/UserProfileAvatar'
import ThumbsUpIcon from '../../../icons/ThumbsUpIcon'
import PostIcon from '../../../icons/Admin/PostIcon'
import CommentIcon from '../../../icons/CommentIcon'
import ThumbsDownIcon from '../../../icons/ThumbsDownIcon'
import PinIcon from '../../../icons/PinIcon'
import StarIcon from '../../../icons/StarIcon'
import Tag from '../../../components/Tag'
import BlockTitle from '../../../components/BlockTitle'
import UserLastComments from '../../../components/User/UserLastComments'
import { useUser } from '../../../hooks'
import { useRouter } from 'next/router'
import UserImageGallery from '../../../components/User/UserImageGallery'
import Ads from '../../../components/Ads'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'

const UserDestinationMap = dynamic(() => import('../../../components/User/UserDestinationMap'), { ssr: false })

type Props = {
    userProfile: UserPublicProfile
}

const UserPage = ({ userProfile }: Props) => {
    const { userIsLoggedIn, user } = useUser()
    const userIsOwner = userProfile.id === user?.id
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const router = useRouter()
    const showVisitedBlock =
        (userProfile.countriesVisited && userProfile.countriesVisited?.length > 0) ||
        (userProfile.citiesVisited && userProfile.citiesVisited?.length > 0)

    const renderMessageBtn = () => {
        if (!userIsLoggedIn || userIsOwner) {
            return null
        }

        return (
            <div className={styles.ActionButton} onClick={() => router.push('/profile/messages/' + userProfile.id)}>
                <span>{'Saada sõnum'}</span>
            </div>
        )
    }

    return (
        <Fragment>
            <NextSeo
                noindex={true}
                title={'Trip.ee | ' + userProfile.name}
                description={userProfile.rankName + ', liitus tripiga ' + userProfile.joinedDate}
            />
            <Header
                backgroundImage={'/images/user_page_bg.jpg'}
                className={styles.Header}
                style={{ backgroundPosition: '50% 25%' }}
            />
            <div className={styles.BodyContainer}>
                <div className={containerStyle.ContainerLg}>
                    <div className={styles.Body}>
                        <div className={styles.Avatar}>
                            <UserProfileAvatar {...userProfile} />
                        </div>
                        <div className={styles.UserNameContainer}>
                            <div className={styles.UserName}>{userProfile.name}</div>
                            {renderMessageBtn()}
                        </div>
                        <div className={styles.Joined}>Liitus Tripiga {userProfile.joinedDate}</div>
                        <div className={styles.Statistics}>
                            <div className={styles.StatisticsItem}>
                                <ThumbsUpIcon />
                                <span className={styles.StatisticsLabel}>{userProfile.liked} meeldimist</span>
                            </div>
                            <div className={styles.StatisticsItem}>
                                <ThumbsDownIcon />
                                <span className={styles.StatisticsLabel}>{userProfile.disliked} mittemeeldimist</span>
                            </div>
                            <div className={styles.StatisticsItem}>
                                <PostIcon />
                                <span className={styles.StatisticsLabel}>{userProfile.postCount} postitust</span>
                            </div>
                            <div className={styles.StatisticsItem}>
                                <CommentIcon />
                                <span className={styles.StatisticsLabel}>{userProfile.commentCount} kommentaari</span>
                            </div>
                        </div>

                        <div className={styles.BackGroundMap}>
                            <UserDestinationMap
                                selectedCountries={userProfile.countriesVisited}
                                selectedCities={userProfile.citiesVisited}
                            />
                        </div>

                        {showVisitedBlock && (
                            <div className={styles.VisitedBlock}>
                                <div className={styles.VisitedHeader}>On külastanud:</div>
                                {userProfile.countriesVisited && userProfile.countriesVisited?.length > 0 && (
                                    <div className={styles.DestinationInfo}>
                                        <div className={styles.Info}>
                                            <PinIcon />
                                            <div className={styles.InfoTitle}>
                                                {userProfile.countriesVisited.length} riiki (
                                                {userProfile.countryPercentage}%)
                                            </div>
                                        </div>
                                        <div className={styles.Tags}>
                                            {userProfile.countriesVisited.map((destination) => {
                                                return (
                                                    <Tag
                                                        title={destination.name}
                                                        large={true}
                                                        white={true}
                                                        route={'/sihtkoht/' + destination.slug}
                                                        key={destination.id}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                                {userProfile.citiesVisited && userProfile.citiesVisited?.length > 0 && (
                                    <div className={styles.DestinationInfo}>
                                        <div className={styles.Info}>
                                            <PinIcon />
                                            <div className={styles.InfoTitle}>
                                                {userProfile.citiesVisited.length} linna või piirkonda
                                            </div>
                                        </div>
                                        <div className={styles.Tags}>
                                            {userProfile.citiesVisited.map((destination) => {
                                                return (
                                                    <Tag
                                                        title={destination.name}
                                                        large={true}
                                                        white={true}
                                                        route={'/sihtkoht/' + destination.slug}
                                                        key={destination.id}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {userProfile.wantsToGo && userProfile.wantsToGo?.length > 0 && (
                            <>
                                <div className={styles.VisitedHeader}>Tahab minna:</div>
                                <div className={styles.DestinationInfo}>
                                    <div className={styles.Info}>
                                        <StarIcon />
                                        <div className={styles.InfoTitle}>{userProfile.wantsToGo.length} sihtkohta</div>
                                    </div>
                                    <div className={styles.Tags}>
                                        {userProfile.wantsToGo.map((destination) => {
                                            return (
                                                <Tag
                                                    title={destination.name}
                                                    large={true}
                                                    white={true}
                                                    route={'/sihtkoht/' + destination.slug}
                                                    key={destination.id}
                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )}

                        {userIsLoggedIn && (
                            <div className={styles.ActionButtons}>
                                {(userIsOwner || userIsAdmin) && (
                                    <div
                                        className={styles.ActionButton}
                                        onClick={() => router.push('/user/' + userProfile.id + '/edit')}
                                    >
                                        <span>{'Muuda profiili'}</span>
                                    </div>
                                )}
                                {userIsOwner && (
                                    <>
                                        <div
                                            className={styles.ActionButton}
                                            onClick={() => router.push('/profile/messages')}
                                        >
                                            <span>{'Sõnumid'}</span>
                                        </div>
                                        <div
                                            className={styles.ActionButton}
                                            onClick={() => router.push('/profile/destinations')}
                                        >
                                            <span>{'Minu sihtkohad'}</span>
                                        </div>
                                        <div
                                            className={styles.ActionButton}
                                            onClick={() => router.push('/user/' + userProfile.id + '/images')}
                                        >
                                            <span>{'Minu pildid'}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.ImageGallery}>
                <div className={styles.ImagesContainer}>
                    <UserImageGallery {...userProfile} />
                </div>
            </div>
            <div className={styles.ForumPosts}>
                <div className={containerStyle.ContainerXl}>
                    <div className={styles.ContainerBody}>
                        <div className={styles.ForumList}>
                            <div className={styles.ForumListTitle}>
                                <BlockTitle title={'Viimased kommentaarid'} />
                            </div>
                            <div className={styles.UserLastComments}>
                                <UserLastComments {...userProfile} />
                            </div>
                        </div>
                        <div className={styles.Sidebar}>
                            <div className={styles.Ads}>
                                <Ads type={'sidebar-small'} />
                                <Ads type={'sidebar-large'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const id = context.query.id
        const url = process.env.API_BASE_URL + '/user/' + id
        const response = await ApiClientSSR(context).get(url)

        if (!response.data) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                userProfile: response.data,
            },
        }
    } catch (e) {
        return {
            notFound: true,
        }
    }
}

export default UserPage
