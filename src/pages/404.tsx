import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './ErrorPage.module.scss'
import containerStyle from '../styles/containers.module.scss'
import { NextSeo } from 'next-seo'
import React from 'react'

export default function ErrorPage404() {
    return (
        <>
            <NextSeo noindex={true} />
            <div className={styles.Container}>
                <div className={containerStyle.ContainerXl}>
                    <div className={styles.Navbar}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={containerStyle.ContainerLg}>
                        <div className={styles.Content}>
                            <h2>Ups...</h2>
                            <p>
                                Suure tõenäosusega on lehekülg liigutatud teise kohta. Proovi meie otsingut, et seda
                                leida.
                            </p>
                            <p>Kui soovid minna meie avalehele, vajuta Trip.ee logole.</p>
                        </div>
                    </div>
                </div>
                <Footer simple={true} />
            </div>
        </>
    )
}
