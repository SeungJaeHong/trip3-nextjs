import React, {Fragment, useEffect} from "react"
import Script from 'next/script'
import styles from "./LoginForm.module.scss"
import clsx from "clsx"
import Router from "next/router"
import FormInput from "../Form/FormInput"
import SubmitButton from "../Form/SubmitButton"
import {useAppDispatch, useAppSelector} from "../../hooks"
import {selectUser, setUser} from "../../redux/auth"
import toast from 'react-hot-toast'
import {setFormErrors} from "../../helpers"
import {createUserOrLogin, login} from "../../services/auth.service"
import FormCheckbox from "../Form/FormCheckbox"
import {SubmitHandler, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

type Inputs = {
    name: string,
    password: string,
    remember_me: boolean
}

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    const loginSchema = yup.object().shape({
        name: yup.string().required('Kasutajanimi on kohustuslik'),
        password: yup.string().required('Parool on kohustuslik'),
    }).required()

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(loginSchema)
    })

    useEffect(() => {
        if (user && user.id) {
            Router.replace('/')
        }
    }, [user])

    const handleLogin: SubmitHandler<Inputs> = async (values: Inputs) => {
        const { name, password, remember_me } = values
        const resp = await login(name, password, remember_me).then(res => {
            dispatch(setUser(res.data))
            toast.success('Sisselogimine õnnestus!')
        }).catch(err => {
            if (err.response?.data?.errors) {
                setFormErrors(err.response.data.errors, setError)
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
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className={styles.FormInput}>
                            <FormInput
                                name={'name'}
                                id={'name'}
                                label={'Kasutajanimi'}
                                disabled={isSubmitting}
                                required={true}
                                error={errors.name?.message}
                                register={register} />
                        </div>
                        <div className={styles.FormInput}>
                            <FormInput
                                name={'password'}
                                id={'password'}
                                label={'Parool'}
                                type={'password'}
                                disabled={isSubmitting}
                                required={true}
                                error={errors.password?.message}
                                register={register} />
                        </div>
                        <div className={styles.FormInput}>
                            <FormCheckbox
                                name={'remember_me'}
                                id={'remember_me'}
                                label={'Pea mu logimine meeles'}
                                disabled={isSubmitting}
                                register={register} />
                        </div>
                        <div className={styles.SubmitButton}>
                            <SubmitButton
                                title={'Logi sisse'}
                                submitting={isSubmitting} />
                        </div>
                    </form>
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