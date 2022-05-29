import React, { Fragment, useEffect, useState } from 'react'
import styles from './UserProfileDestinationPage.module.scss'
import containerStyle from '../../../styles/containers.module.scss'
import { Destination } from '../../../types'
import { useUser } from '../../../hooks'
import { useRouter } from 'next/router'
import BackgroundMap from '../../../components/BackgroundMap'
import clsx from 'clsx'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { getMyDestinationsData } from '../../../services/user.service'
import UserProfileDestinationForm from '../../../components/User/UserProfileDestinationForm'
import { NextSeo } from 'next-seo'

const UserProfileDestinationPage = () => {
    const { userIsLoggedIn } = useUser()
    const [allDestinations, setAllDestinations] = useState<Destination[]>([])
    const [visited, setVisited] = useState<Destination[]>([])
    const [wantsToGo, setWantsToGo] = useState<Destination[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        getMyDestinationsData()
            .then((response) => {
                setAllDestinations(response.data.options)
                setVisited(response.data.visited)
                setWantsToGo(response.data.wantsToGo)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                if (err.response.status === 401) {
                    router.push('/')
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (userIsLoggedIn === false) {
        router.push('/')
    }

    if (loading) {
        return (
            <div className={styles.Loader}>
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <Fragment>
            <NextSeo nofollow={true} noindex={true} />
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Minu sihtkohad</div>
                    <div className={styles.Form}>
                        <UserProfileDestinationForm options={allDestinations} visited={visited} wantsToGo={wantsToGo} />
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default UserProfileDestinationPage
