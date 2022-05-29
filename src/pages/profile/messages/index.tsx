import React, { Fragment } from 'react'
import UserMessages from '../../../components/User/UserMessages'
import styles from './UserProfileMessagesPage.module.scss'
import BackgroundMap from '../../../components/BackgroundMap'
import containerStyle from '../../../styles/containers.module.scss'
import clsx from 'clsx'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { useRouter } from 'next/router'
import { useUser } from '../../../hooks'
import { NextSeo } from 'next-seo'

const UserProfileMessagesPage = () => {
    const { userIsLoggedIn } = useUser()
    const router = useRouter()

    if (userIsLoggedIn === false) {
        router.push('/')
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
                    <div className={styles.Title}>Sõnumid</div>
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
