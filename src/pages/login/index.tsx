import React, { Fragment, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import styles from './Login.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'
import Link from 'next/link'
import LoginForm from '../../components/LoginForm'
import { GetServerSideProps } from 'next'
import ApiClientSSR from '../../lib/ApiClientSSR'
import Router, { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { NextSeo } from 'next-seo'
import { useUser } from '../../hooks'
import WarningIcon from "../../icons/WarningIcon";

const LoginPage = () => {
    const router = useRouter()
    const { userIsLoggedIn } = useUser()

    useEffect(() => {
        if (router.query?.verified) {
            toast.success('Kasutajakonto on verifitseeritud!')
        }
    }, [router.query?.verified])

    useEffect(() => {
        if (userIsLoggedIn) {
            Router.replace('/')
        }
    }, [userIsLoggedIn])

    return (
        <Fragment>
            <NextSeo title={'Trip.ee | Logi sisse'} />
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Logi sisse</div>
                    <div className={styles.RegisterTitle}>
                        Pole veel kasutaja?
                        <Link href={'/register'}>
                            <a>Registreeri siin</a>
                        </Link>
                    </div>
                    <div className={styles.CookieInfoContainer}>
                        <WarningIcon />
                        <div className={styles.CookieInfoText}>
                            Kui sisselogimisega tekib viga, siis soovitame esilagu küpsised brauseris ära kustutada ja uuesti proovida.<br/>
                            Infot kustutamise kohta leiab <a href={'http://et.wondershare.com/recover-data/delete-cookies-from-web-browser.html'} target={'_blank'} rel={'noreferrer'}>siit</a>.
                        </div>
                    </div>
                    <div className={styles.Form}>
                        <LoginForm />
                    </div>
                    <div className={styles.ForgotPassword}>
                        Ei mäleta oma parooli?{' '}
                        <Link href={'/reset-password'}>
                            <a className={styles.ForgotPasswordLink}>Taasta oma parool siin</a>
                        </Link>
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

export default LoginPage
