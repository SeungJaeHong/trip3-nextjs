import React, {useEffect} from 'react'
import styles from './UserProfileChatPage.module.scss'
import containerStyle from '../../../../styles/containers.module.scss'
import clsx from 'clsx'
import Navbar from '../../../../components/Navbar'
import BackgroundMap from '../../../../components/BackgroundMap'
import UserChat from '../../../../components/User/UserChat'
import { useRouter } from 'next/router'
import { useUser } from '../../../../hooks'
import { NextSeo } from 'next-seo'

const UserProfileChatPage = () => {
    const { userIsLoggedIn } = useUser()
    const router = useRouter()

    useEffect(() => {

    }, [])

    if (userIsLoggedIn === false) {
        router.push('/')
    }

    return (
        <>
            <NextSeo nofollow={true} noindex={true} />
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                </div>
                <div className={styles.Content}>
                    <UserChat />
                </div>
            </div>
        </>
    )
}

export default UserProfileChatPage
