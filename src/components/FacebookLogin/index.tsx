import React, {Fragment} from "react"
import Script from 'next/script'
import styles from "./FacebookLogin.module.scss"
import {toast} from 'react-toastify'
import {createUserOrLogin} from "../../services/auth.service"
import useUser from "../../hooks"

const FacebookLogin = () => {
    const {mutate } = useUser()
    const signInFB = () => {
        FB.login(function(response) {
            if (response.status === 'connected') {
                FB.api('/me?fields=id,email,name,picture', function(userResponse: any) {

                    console.log(userResponse, 'userResponse')

                    const imageUrl = userResponse?.picture?.data?.url ? userResponse.picture.data.url : undefined
                    createUserOrLogin(userResponse.name, userResponse.email).then(res => {
                        mutate(res.data)
                        toast.success('Tere, ' + res.data.name + '!')
                    }).catch(err => {
                        toast.error('Sisselogimine ebaõnnestus!')
                    })
                })
            }
        }, {scope: 'public_profile,email'})
    }

    return (
        <Fragment>
            <div className={styles.FacebookLogin} onClick={() => signInFB()}>
                Facebook
            </div>

            <Script
                src={"https://connect.facebook.net/en_US/sdk.js"}
                onLoad={() => {
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId      : process.env.FACEBOOK_APP_ID,
                            cookie     : false,
                            xfbml      : true,
                            version    : 'v13.0'
                        });
                    };
                }}
            />
        </Fragment>
    )
}

export default FacebookLogin