import React, {Fragment} from 'react'
import styles from './UserProfileMessagesPage.module.scss'
import containerStyle from '../../../styles/containers.module.scss'
import useUser from "../../../hooks"
import {useRouter} from "next/router"
import BackgroundMap from "../../../components/BackgroundMap"
import clsx from "clsx"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import UserMessages from "../../../components/User/UserMessages"

const UserProfileMessagesPage = () => {
    const { userIsLoggedIn } = useUser()
    const router = useRouter()

    if (userIsLoggedIn === false) {
        router.push('/')
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
                            <UserMessages />
                        </div>
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default UserProfileMessagesPage