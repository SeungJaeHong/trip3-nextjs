import React, { Fragment } from 'react'
import Navbar from '../../../components/Navbar'
import styles from '../../reset-password/ResetPassword.module.scss'
import clsx from 'clsx'
import Footer from '../../../components/Footer'
import containerStyle from '../../../styles/containers.module.scss'
import BackgroundMap from '../../../components/BackgroundMap'
import { GetServerSideProps } from 'next'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import ResetPasswordForm from '../../../components/ResetPasswordForm'
import ErrorIcon from '../../../icons/ErrorIcon'

type Props = {
    valid: boolean
}

const ResetPasswordPage = ({ valid }: Props) => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Vali uus parool</div>
                    {!valid && (
                        <div className={styles.AlertContainer}>
                            <div className={styles.Alert}>
                                <ErrorIcon />
                                <div className={styles.AlertTitle}>
                                    See link on aegunud või ei eksisteeri!
                                    <br /> Taasta oma parool uuesti <a href={'/reset-password'}>siin</a>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={styles.Form}>
                        <ResetPasswordForm disabled={!valid} />
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const token = context.query.token
        const email = context.query.email
        await ApiClientSSR(context).get('/auth/reset-password/' + token + '?email=' + email)
        return {
            props: {
                valid: true,
            },
        }
    } catch (e: any) {
        const status = e?.response.status
        if (status === 403) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        } else {
            return {
                props: {
                    valid: false,
                },
            }
        }
    }
}

export default ResetPasswordPage
