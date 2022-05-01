import React, { Fragment } from 'react'
import Script from 'next/script'
import styles from './GoogleLogin.module.scss'
import { toast } from 'react-toastify'
import { createUserOrLogin } from '../../services/auth.service'
import useUser from '../../hooks'
import jwt_decode from 'jwt-decode'

const GoogleLogin = () => {
    const { mutate } = useUser()

    const signInGoogle = () => {
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                toast.error('Google sisselogimine ebaõnnestus!')
            }
        })
    }

    const handleResponse = async (response: any) => {
        const profile: any = jwt_decode(response.credential)
        const name = profile.name
        const email = profile.email
        const imageUrl = profile.picture ? profile.picture.replace('=s96', '=s180') : undefined

        await createUserOrLogin(name, email, imageUrl)
            .then((res) => {
                mutate(res.data)
                toast.success('Tere, ' + res.data.name + '!')
            })
            .catch((err) => {
                toast.error('Sisselogimine ebaõnnestus!')
            })
    }

    return (
        <Fragment>
            <div className={styles.GoogleLogin} onClick={() => signInGoogle()}>
                Google
            </div>

            <Script
                src={'https://accounts.google.com/gsi/client'}
                onLoad={() => {
                    google.accounts.id.initialize({
                        client_id: process.env.GOOGLE_CLIENT_ID as string,
                        callback: handleResponse,
                    })
                }}
            />
        </Fragment>
    )
}

export default GoogleLogin
