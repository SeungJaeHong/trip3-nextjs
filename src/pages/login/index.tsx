import React, {Fragment, useEffect} from "react"
import Navbar from "../../components/Navbar"
import styles from './Login.module.scss'
import clsx from "clsx"
import Footer from "../../components/Footer"
import containerStyle from "../../styles/containers.module.scss"
import BackgroundMap from "../../components/BackgroundMap"
import Link from "next/link"
import LoginForm from "../../components/LoginForm"
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../lib/ApiClientSSR"
import {useRouter} from "next/router"
import {toast} from 'react-toastify'

const LoginPage = (props: any) => {
    const router = useRouter()
    useEffect(() => {
        if (router.query?.verified) {
            toast.success('Kasutajakonto on verifitseeritud!')
        }
    }, [router.query?.verified])

    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>
                        Logi sisse
                    </div>
                    <div className={styles.RegisterTitle}>
                        Pole veel kasutaja?
                        <Link href={'/register'}>
                            <a>Registreeri siin</a>
                        </Link>
                    </div>
                    <div className={styles.Form}>
                        <LoginForm />
                    </div>
                    <div className={styles.ForgotPassword}>
                        Ei mäleta oma parooli? <Link href={'/reset-password'}><a className={styles.ForgotPasswordLink}>Taasta oma parool siin</a></Link>
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
            props: {}
        }
    }
}

export default LoginPage