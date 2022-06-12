import React, { Fragment, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import styles from './ResetPassword.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'
import { GetServerSideProps } from 'next'
import ApiClientSSR from '../../lib/ApiClientSSR'
import ForgotPasswordForm from '../../components/ForgotPasswordForm'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import { useUser } from '../../hooks'

const ForgotPasswordPage = () => {
    const { userIsLoggedIn } = useUser()
    useEffect(() => {
        if (userIsLoggedIn) {
            Router.replace('/')
        }
    }, [userIsLoggedIn])

    return (
        <Fragment>
            <NextSeo title={'Trip.ee | Taasta parool'} />
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Ei mäleta oma parooli?</div>
                    <div className={styles.InfoTitle}>Sisesta oma e-mail ja me saadame sulle kinnituslingi</div>
                    <div className={styles.Form}>
                        <ForgotPasswordForm />
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const user = await ApiClientSSR(context).get('/user')
        if (user?.data?.id) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        } else {
            return {
                props: {},
            }
        }
    } catch (e) {
        return {
            props: {},
        }
    }
}

export default ForgotPasswordPage
