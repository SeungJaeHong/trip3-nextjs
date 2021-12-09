import React from 'react'
import styles from './UserProfileChatPage.module.scss'
import containerStyle from '../../../../styles/containers.module.scss'
import clsx from "clsx"
import Navbar from "../../../../components/Navbar"
import BackgroundMap from "../../../../components/BackgroundMap"
import UserChat from "../../../../components/User/UserChat"

const UserProfileChatPage = () => {
    return (
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
    )
}

export default UserProfileChatPage