import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './ErrorPage.module.scss'
import containerStyle from '../styles/containers.module.scss'
import { NextSeo } from 'next-seo'
import React from 'react'

export default function ErrorPage503() {
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
                            <h2>Käib töö ja vile koos...</h2>
                            <p>Hetkel toimub uuenduste ja paranduste üleslaadimine.</p>
                            <p>Proovi mõne minuti pärast uuesti.</p>
                        </div>
                    </div>
                </div>
                <Footer simple={true} />
            </div>
        </>
    )
}
