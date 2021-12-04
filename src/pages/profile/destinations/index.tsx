import React, {Fragment, useEffect, useState} from 'react'
import styles from './UserProfileDestinationPage.module.scss'
import containerStyle from '../../../styles/containers.module.scss'
import {Destination} from "../../../types"
import useUser from "../../../hooks"
import {useRouter} from "next/router"
import BackgroundMap from "../../../components/BackgroundMap"
import clsx from "clsx";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LoadingSpinner2 from "../../../components/LoadingSpinner2"
import {getMyDestinationsData} from "../../../services/user.service"
import UserProfileDestinationForm from "../../../components/User/UserProfileDestinationForm";

const UserProfileDestinationPage = () => {
    const { userIsLoggedIn, user } = useUser()
    const [visited, setVisited] = useState<Destination[]>()
    const [wantsToGo, setWantsToGo] = useState<Destination[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        getMyDestinationsData().then((response) => {
            setVisited(response.data.visited)
            setWantsToGo(response.data.wantsToGo)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            if (err.response.status === 401) {
                router.push('/')
            }
        })
    }, [])

    if (loading) {
        return (
            <div className={styles.Loader}>
                <LoadingSpinner2 />
            </div>
        )
    }

    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>
                        Minu sihtkohad
                    </div>
                    <div className={styles.Form}>
                        <UserProfileDestinationForm />
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default UserProfileDestinationPage