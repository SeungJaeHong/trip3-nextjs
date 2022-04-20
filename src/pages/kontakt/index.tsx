import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar'
import styles from './ContactPage.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'

const ContactPage = () => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Kontakt</div>
                </div>
            </div>
            <div className={containerStyle.ContainerLg}>
                <div className={containerStyle.CenteredContainer}>
                    <div className={styles.Body}>
                        <h3>Üldaadressid</h3>
                        <ul>
                            <li>
                                Üldised küsimused: <strong>trip@trip.ee</strong>
                            </li>
                            <li>
                                Reklaam: <strong>reklaam@trip.ee</strong>
                            </li>
                            <li>
                                Kasutajatugi, registreerumis- ja logimisprobleemid: <strong>abi@trip.ee</strong>
                            </li>
                            <li>
                                Tehnilised küsimused, liidestused: <strong>kaspar@trip.ee</strong>
                            </li>
                        </ul>

                        <h3>Meeskond</h3>
                        <ul>
                            <li>
                                Veigo Kell: <strong>veigo@trip.ee</strong>
                                <i>(uudised, toimetus)</i>
                            </li>
                            <li>
                                Andres Lahtvee: <strong>andres@trip.ee</strong>
                                <i>(reklaam, müük)</i>
                            </li>
                            <li>
                                Kaspar Kallasmaa: <strong>kaspar@trip.ee</strong>
                                <i>(tehnilised küsimused)</i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default ContactPage
