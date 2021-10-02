import React, {Fragment} from "react"
import Navbar from "../../components/Navbar"
import styles from './TermsOfService.module.scss'
import clsx from "clsx";
import Footer from "../../components/Footer"
import containerStyle from "../../styles/containers.module.scss"
import BackgroundMap from "../../components/BackgroundMap";
import Link from "next/link";
import {GetServerSideProps} from "next";
import ApiClientSSR from "../../lib/ApiClientSSR";

const TermsOfServicePage = (props: any) => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>
                        Kasutustingimused
                    </div>
                </div>
            </div>
            <div className={containerStyle.containerLg}>
                <div className={styles.Body}>
                    BODY
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const content = await ApiClientSSR(context).get('/terms')
        return {
            props: {
                content: content
            }
        }
    } catch (e) {
        return {
            props: {}
        }
    }
}

export default TermsOfServicePage