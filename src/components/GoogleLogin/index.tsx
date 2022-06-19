import React, { Fragment } from 'react'
import Script from 'next/script'
import styles from './GoogleLogin.module.scss'
import { toast } from 'react-toastify'
import { createUserOrLogin } from '../../services/auth.service'
import { useUser } from '../../hooks'
import axios from 'axios'

const GoogleLogin = () => {
    const { mutate } = useUser()

    const signInGoogle = () => {
        const tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: process.env.GOOGLE_CLIENT_ID as string,
            callback: handleResponse,
            scope: 'profile email',
            prompt: 'select_account',
        })

        tokenClient.requestAccessToken()
    }

    const handleResponse = async (response: any) => {
        const access_token = response.access_token
        await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                const profile = res.data
                const name = profile.name
                const email = profile.email
                const imageUrl = profile.picture ? profile.picture.replace('=s96', '=s180') : undefined

                createUserOrLogin(name, email, imageUrl).then((res) => {
                    mutate(res.data)
                    toast.success('Tere, ' + res.data.name + '!')
                })
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
