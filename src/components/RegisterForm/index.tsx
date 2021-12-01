import React, {useEffect} from "react"
import styles from "./RegisterForm.module.scss"
import clsx from "clsx"
import Router from "next/router"
import FormInput from "../Form/FormInput"
import SubmitButton from "../Form/SubmitButton"
import useUser from "../../hooks"
import {register as registerUser} from "../../services/auth.service";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {setFormErrors} from "../../helpers"

type Inputs = {
    name: string,
    email: string,
    password: string
    password_confirmation: string
}

const RegisterForm = () => {
    const { loggedIn, user, mutate } = useUser()
    const registerSchema = yup.object().shape({
        name: yup.string().required('Kasutajanimi on kohustuslik'),
        email: yup.string().email('E-post ei ole korrektne').required('E-post on kohustuslik'),
        password: yup.string().required('Parool on kohustuslik'),
        password_confirmation: yup.string()
            .required('Parooli kordamine on kohustuslik')
            .oneOf([yup.ref('password'), null], 'Paroolid ei ühti'),
    }).required()

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(registerSchema)
    })

    useEffect(() => {
        if (loggedIn) {
            Router.replace('/')
        }
    }, [loggedIn])

    const handleRegister: SubmitHandler<Inputs> = async (values: Inputs) => {
        const { name, email, password } = values
        const resp = await registerUser(name, email, password).then(res => {
            Router.push('/login')
            toast.success(
                'Kasutaja loomine õnnestus!',
                {
                    duration: 5000
                }
            )
            toast.success(
                'Palun kontrolli oma e-posti ja vii kasutaja registeerimine lõpuni',
                {
                    duration: 6000
                }
            )
        }).catch(err => {
            if (err.response?.data?.errors) {
                setFormErrors(err.response?.data?.errors, setError)
            }
            toast.error('Registreerimine ebaõnnestus!')
        })
    }

    return (
        <div className={styles.RegisterForm}>
            <div className={styles.Tabs}>
                <div className={clsx(styles.Tab, styles.UserName)}>
                    E-mailiga
                </div>
                <div className={clsx(styles.Tab, styles.Social, styles.Facebook)}>
                    Facebook
                </div>
                <div className={clsx(styles.Tab, styles.Social, styles.Google)}>
                    Google
                </div>
            </div>
            <div className={styles.FormContainer}>
                <form onSubmit={handleSubmit(handleRegister)}>
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
                            name={'email'}
                            id={'email'}
                            label={'E-mail'}
                            type={'email'}
                            disabled={isSubmitting}
                            required={true}
                            error={errors.email?.message}
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
                        <FormInput
                            name={'password_confirmation'}
                            id={'password_confirmation'}
                            label={'Parool uuesti'}
                            type={'password'}
                            disabled={isSubmitting}
                            required={true}
                            error={errors.password_confirmation?.message}
                            register={register} />
                    </div>
                    <div className={styles.SubmitButton}>
                        <SubmitButton
                            title={'Registreeri'}
                            submitting={isSubmitting} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm