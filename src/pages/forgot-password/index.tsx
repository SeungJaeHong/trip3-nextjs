import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar'
import styles from './ResetPassword.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'
import { GetServerSideProps } from 'next'
import ApiClientSSR from '../../lib/ApiClientSSR'
import ResetPasswordForm from '../../components/ResetPasswordForm'

const ResetPasswordPage = () => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Ei mäleta oma parooli?</div>
                    <div className={styles.RegisterTitle}>Sisesta oma e-mail ja me saadame sulle kinnituslingi</div>
                    <div className={styles.Form}>
                        <ResetPasswordForm />
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        await ApiClientSSR(context).get('/user')
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    } catch (e) {
        return {
            props: {},
        }
    }
}

export default ResetPasswordPage
