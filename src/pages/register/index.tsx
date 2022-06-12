import React, { Fragment } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import styles from './Register.module.scss'
import clsx from 'clsx'
import Footer from '../../components/Footer'
import containerStyle from '../../styles/containers.module.scss'
import BackgroundMap from '../../components/BackgroundMap'
import RegisterForm from '../../components/RegisterForm'
import { GetServerSideProps } from 'next'
import ApiClientSSR from '../../lib/ApiClientSSR'
import { NextSeo } from 'next-seo'

const RegisterPage = () => {
    return (
        <Fragment>
            <NextSeo title={'Trip.ee | Registreeri'} />
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Registreeri</div>
                    <div className={styles.RegisterTitle}>Liitu Trip.ee reisihuviliste seltskonnaga</div>
                    <div className={styles.Form}>
                        <RegisterForm />
                    </div>
                    <div className={styles.BottomInfo}>
                        <div className={styles.ExtraInfo}>
                            Trip.ee keskkonnaga liitudes nõustun ma
                            <Link href={'/kasutustingimused'}>
                                <a className={styles.ExtraInfoLink}>kasutustingimustega</a>
                            </Link>
                        </div>
                        <div className={styles.ExtraInfo}>
                            Kasutaja olemas?
                            <Link href={'/login'}>
                                <a className={styles.ExtraInfoLink}>Logi sisse</a>
                            </Link>
                        </div>
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

export default RegisterPage
