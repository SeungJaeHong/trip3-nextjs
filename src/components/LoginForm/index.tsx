import React, {Fragment, useEffect, useState} from "react"
import Script from 'next/script'
import {Field, Form, Formik, FormikHelpers, FormikProps} from 'formik'
import styles from "./LoginForm.module.scss"
import clsx from "clsx"
import Router from "next/router"
import FormInput from "../Form/FormInput"
import SubmitButton from "../Form/SubmitButton"
import {useAppDispatch, useAppSelector} from "../../hooks"
import {selectUser, setUser} from "../../redux/auth"
import toast from 'react-hot-toast'
import {setFormikErrors} from "../../helpers"
import {login} from "../../services/auth.service"

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const [fbLoaded, setFbLoaded] = useState(false)

    useEffect(() => {
        if (user && user.id) {
            Router.replace('/')
        }
    }, [user])

    const handleLogin = async (values: any, formikHelpers: FormikHelpers<any>) => {
        const { name, password } = values
        const resp = await login(name, password).then(res => {
            dispatch(setUser(res.data))
            toast.success('Sisselogimine õnnestus!')
        }).catch(err => {
            if (err.response?.data?.errors) {
                setFormikErrors(err.response.data.errors, formikHelpers.setFieldError)
            }
            toast.error('Sisselogimine ebaõnnestus!')
        })
    }

    const signInFB = () => {
        FB.login(function(response) {
            console.log('login', response)
            if (response.status === 'connected') {
                console.log('logged in')
                FB.api('/me', function(response2: any) {
                    console.log('Good to see you, ' + response2.name + '.');
                    console.log('me', response2)
                });
            } else {
                console.log('not logged in')
            }
        }, {scope: 'public_profile,email'})


        /*FB.getLoginStatus(function(response) {
            console.log('getLoginStatus', response)
            if (response.status === 'connected') {
                // Logged into your webpage and Facebook.
                console.log('logged in')
            } else {
                console.log('not logged in')
                // The person is not logged into your webpage or we are unable to tell.
            }
        })*/
    }

    // @ts-ignore
    return (
        <Fragment>
            <div className={styles.LoginForm}>
                <div className={styles.Tabs}>
                    <div className={clsx(styles.Tab, styles.UserName)}>
                        Kasutajanimi
                    </div>
                    <div className={clsx(styles.Tab, styles.Social, styles.Facebook)} onClick={() => signInFB()}>
                        Facebook
                    </div>
                    <div className={clsx(styles.Tab, styles.Social, styles.Google)}>
                        Google
                    </div>
                </div>
                <div className={styles.FormContainer}>
                    <Formik
                        initialValues={{ name: '', password: '' }}
                        onSubmit={handleLogin}
                    >
                        {({ values, isSubmitting, handleChange, handleBlur, errors, touched }: FormikProps<any>) => (
                            <Form>
                                <div className={styles.FormInput}>
                                    <Field
                                        name={'name'}
                                        id={'name'}
                                        label={'Kasutajanimi'}
                                        disabled={isSubmitting}
                                        hasError={errors?.name?.length}
                                        component={FormInput} />
                                </div>
                                <div className={styles.FormInput}>
                                    <Field
                                        name={'password'}
                                        id={'password'}
                                        label={'Parool'}
                                        type={'password'}
                                        disabled={isSubmitting}
                                        hasError={errors?.password?.length}
                                        component={FormInput} />
                                </div>
                                <div className={styles.SubmitButton}>
                                    <SubmitButton
                                        title={'Logi sisse'}
                                        submitting={isSubmitting} />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            <Script
                src={"https://connect.facebook.net/en_US/sdk.js"}
                onLoad={() => {
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId      : process.env.FACEBOOK_APP_ID,
                            cookie     : true,
                            xfbml      : true,
                            version    : 'v12.0'
                        });


                        /*FB.getLoginStatus(function(response) {
                            console.log('siin', response)
                            //statusChangeCallback(response);
                        });*/
                    };

                    /*console.log('loaded')
                    FB.login(function(response) {
                        console.log('siin', response)
                    }, {scope: 'public_profile,email'});*/
                }}
            />
        </Fragment>
    )
}

export default LoginForm