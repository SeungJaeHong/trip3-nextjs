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
import {createUserOrLogin, login} from "../../services/auth.service"
import FormCheckbox from "../Form/FormCheckbox";

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    useEffect(() => {
        if (user && user.id) {
            Router.replace('/')
        }
    }, [user])

    const handleLogin = async (values: any, formikHelpers: FormikHelpers<any>) => {
        const { name, password, remember_me } = values
        const resp = await login(name, password, remember_me).then(res => {
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
            if (response.status === 'connected') {
                FB.api('/me?fields=id,email,name,picture.width(800).height(800)', function(userResponse: any) {
                    const res = createUserOrLogin(userResponse.name, userResponse.email).then(res => {
                        dispatch(setUser(res.data))
                        toast.success('Sisselogimine õnnestus!')
                    }).catch(err => {
                        console.log('err', err.data)
                        toast.error('Sisselogimine ebaõnnestus!')
                    })
                })
            }
        }, {scope: 'public_profile,email'})
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
                        initialValues={{ name: '', password: '', remember_me: false }}
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
                                <div className={styles.FormInput}>
                                    <Field
                                        name={'remember_me'}
                                        id={'remember_me'}
                                        label={'Pea mu logimine meeles'}
                                        disabled={isSubmitting}
                                        checked={values.remember_me}
                                        component={FormCheckbox} />
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
                    };
                }}
            />
        </Fragment>
    )
}

export default LoginForm