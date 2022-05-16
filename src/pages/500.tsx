import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './ErrorPage.module.scss'
import containerStyle from '../styles/containers.module.scss'
import { NextSeo } from 'next-seo'
import React from 'react'

export default function ErrorPage500() {
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
                            <h2>Täitsa tuksis...</h2>
                            <p>
                                Tripil on tehnilised tõrked. Oleme sellest teadlikud ning parandame probleemi
                                võimalikult kiirelt.
                            </p>
                            <p>Proovi mõne aja pärast uuesti.</p>
                        </div>
                    </div>
                </div>
                <Footer simple={true} />
            </div>
        </>
    )
}
