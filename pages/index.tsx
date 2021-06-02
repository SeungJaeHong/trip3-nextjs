import Image from 'next/image'
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
                     backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(/images/bg.jpg)",
                     width: "100%",
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "cover",
                     backgroundPosition: "50% 50%"
                }}>
                <div className={clsx([containerStyle.container_lg, styles.Content])}>
                    <div className={styles.Navbar}>
                        <Navbar />
                    </div>
                    <div className={styles.Search}>
                        <FrontPageSearch />
                    </div>
                </div>
            </div>
            <div className={clsx([containerStyle.container_lg, styles.Content])}>
                <div className="p-12">
                    user: { JSON.stringify(user) }
                </div>

                <div className="pb-12">
                    <Image
                        src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt="Picture of the author"
                        width={1024}
                        height={600}
                        layout={'responsive'}
                    />
                </div>
                <div className="pb-12">
                    <Image
                        src="https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt="Picture of the author"
                        width={1024}
                        height={600}
                        layout={'responsive'}
                    />
                </div>
                <div className="pb-12">
                    <Image
                        src="https://images.pexels.com/photos/4496782/pexels-photo-4496782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt="Picture of the author"
                        width={1024}
                        height={600}
                        layout={'responsive'}
                    />
                </div>
                <div className="pb-12">
                    <Image
                        src="https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt="Picture of the author"
                        width={1024}
                        height={600}
                        layout={'responsive'}
                    />
                </div>
            </div>
        </>
    )
}

export default Home
