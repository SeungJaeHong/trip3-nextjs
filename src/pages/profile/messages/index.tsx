import React, {Fragment, useEffect, useState} from 'react'
import styles from './UserProfileMessagesPage.module.scss'
import containerStyle from '../../../styles/containers.module.scss'
import useUser from "../../../hooks"
import {useRouter} from "next/router"
import BackgroundMap from "../../../components/BackgroundMap"
import clsx from "clsx"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import LoadingSpinner2 from "../../../components/LoadingSpinner2"
import UserMessages from "../../../components/User/UserMessages"
import {getMyMessages} from "../../../services/user.service"
import {UserMessage} from "../../../types"

const UserProfileMessagesPage = () => {
    const { userIsLoggedIn } = useUser()
    const [messages, setMessages] = useState<UserMessage[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        getMyMessages().then((response) => {
            setMessages(response.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            if (err.response.status === 401) {
                router.push('/')
            }
        })
    }, [])

    if (userIsLoggedIn === false) {
        router.push('/')
    }

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
                        Sõnumid
                    </div>
                    <div className={clsx(containerStyle.ContainerLg, styles.UserMessagesContainer)}>
                        <div className={styles.Body}>
                            <UserMessages messages={messages} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default UserProfileMessagesPage