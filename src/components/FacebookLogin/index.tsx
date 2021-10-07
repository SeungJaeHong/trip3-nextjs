import React, {Fragment} from "react"
import Script from 'next/script'
import styles from "./FacebookLogin.module.scss"
import {useAppDispatch} from "../../hooks"
import {setUser} from "../../redux/auth"
import toast from 'react-hot-toast'
import {createUserOrLogin} from "../../services/auth.service"

const FacebookLogin = () => {
    const dispatch = useAppDispatch()
    const signInFB = () => {
        FB.login(function(response) {
            if (response.status === 'connected') {
                FB.api('/me?fields=id,email,name,picture.width(800).height(800)', function(userResponse: any) {
                    const res = createUserOrLogin(userResponse.name, userResponse.email).then(res => {
                        dispatch(setUser(res.data))
                        toast.success('Sisselogimine õnnestus!')
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
                            version    : 'v12.0'
                        });
                    };
                }}
            />
        </Fragment>
    )
}

export default FacebookLogin