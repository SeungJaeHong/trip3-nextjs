import React, {Fragment, useEffect} from "react"
import styles from "./LoginForm.module.scss"
import clsx from "clsx"
import Router from "next/router"
import FormInput from "../Form/FormInput"
import SubmitButton from "../Form/SubmitButton"
import useUser from "../../hooks"
import toast from 'react-hot-toast'
import {setFormErrors} from "../../helpers"
import {login} from "../../services/auth.service"
import FormCheckbox from "../Form/FormCheckbox"
import {SubmitHandler, useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import FacebookLogin from "../FacebookLogin"
import GoogleLogin from "../GoogleLogin"

type Inputs = {
    name: string,
    password: string,
    remember_me: boolean
}

const LoginForm = () => {
    const { userIsLoggedIn, user, mutate } = useUser()
    const loginSchema = yup.object().shape({
        name: yup.string().required('Kasutajanimi on kohustuslik'),
        password: yup.string().required('Parool on kohustuslik'),
    }).required()

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(loginSchema)
    })

    useEffect(() => {
        if (userIsLoggedIn) {
            Router.replace('/')
        }
    }, [user])

    const handleLogin: SubmitHandler<Inputs> = async (values: Inputs) => {
        const { name, password, remember_me } = values
        const resp = await login(name, password, remember_me).then(res => {
            mutate(res.data)
            toast.success('Sisselogimine õnnestus!')
        }).catch(err => {
            if (err.response?.data?.errors) {
                setFormErrors(err.response.data.errors, setError)
            }
            toast.error('Sisselogimine ebaõnnestus!')
        })
    }

    return (
        <Fragment>
            <div className={styles.LoginForm}>
                <div className={styles.Tabs}>
                    <div className={clsx(styles.Tab, styles.UserName)}>
                        Kasutajanimi
                    </div>
                    <div className={styles.Tab}>
                        <FacebookLogin />
                    </div>
                    <div className={styles.Tab}>
                        <GoogleLogin />
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
        </Fragment>
    )
}

export default LoginForm