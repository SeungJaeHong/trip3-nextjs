import {useUser} from "../context/AuthContext"
import React from 'react'
import Navbar from "../components/Navbar"
import FrontPageSearch from "../components/FrontPageSearch"
import containerStyle from '../styles/containers.module.scss'
import styles from './Homepage.module.scss'
import clsx from 'clsx'

const Home = () => {
    const user = useUser()

    return (
        <>
            <div className={styles.Header}
                 style={{
                     backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(/images/header6.jpg)",
                     width: "100%",
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "cover",
                     backgroundPosition: "50% 50%"
                }}>
                <div className={clsx([containerStyle.container_xl, styles.Content])}>
                    <div className={styles.Navbar}>
                        <Navbar />
                    </div>
                    <div className={styles.Search}>
                        <FrontPageSearch />
                    </div>
                </div>
            </div>
            <div className={clsx([containerStyle.container_xl, styles.Content])}>
                <div>
                    user: { JSON.stringify(user) }
                </div>
            </div>
        </>
    )
}

export default Home
