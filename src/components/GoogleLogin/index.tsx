import React, {Fragment} from "react"
import Script from 'next/script'
import styles from "./GoogleLogin.module.scss"
import {useAppDispatch} from "../../hooks"
import {setUser} from "../../redux/auth"
import toast from 'react-hot-toast'
import {createUserOrLogin} from "../../services/auth.service"

const GoogleLogin = () => {
    const dispatch = useAppDispatch()

    const handleError = (err: any) => {
        toast.error('Sisselogimine ebaõnnestus!')
    }

    const handleSuccess = (googleUser: any) => {
        const profile = googleUser.getBasicProfile()
        const name = profile.getName()
        const email = profile.getEmail()
        const image = profile.getImageUrl() //NB! 96 is the image size there!! -> A=s96-c

        const res = createUserOrLogin(name, email).then(res => {
            dispatch(setUser(res.data))
            toast.success('Sisselogimine õnnestus!')
        }).catch(err => {
            toast.error('Sisselogimine ebaõnnestus!')
        })
    }

    const signInGoogle = () => {
        // @ts-ignore
        const auth2 = gapi.auth2.getAuthInstance()
        auth2.signIn().then(
            (res: any) => handleSuccess(res),
            (err: any) => handleError(err)
        )
    }

    return (
        <Fragment>
            <div className={styles.GoogleLogin} onClick={() => signInGoogle()}>
                Google
            </div>

            <Script
                src={"https://apis.google.com/js/api.js"}
                onLoad={() => {
                    // @ts-ignore
                    gapi.load('auth2', function() {
                        // @ts-ignore
                        gapi.auth2.init({
                            client_id: process.env.GOOGLE_CLIENT_ID,
                        })
                    })
                }}
            />
        </Fragment>
    )
}

export default GoogleLogin