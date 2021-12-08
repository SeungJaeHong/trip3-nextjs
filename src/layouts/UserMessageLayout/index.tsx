import React, {Fragment} from "react"
import styles from './UserMessageLayout.module.scss'
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import containerStyle from "../../styles/containers.module.scss"
import clsx from "clsx"
import BackgroundMap from "../../components/BackgroundMap"
import useUser from "../../hooks"
import {useRouter} from "next/router"

type Props = {
    children: React.ReactNode
}

const UserMessageLayout = ({children}: Props) => {
    const { userIsLoggedIn } = useUser()
    const router = useRouter()

    if (userIsLoggedIn === false) {
        router.push('/')
    }

    console.log('render layout')

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
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default UserMessageLayout