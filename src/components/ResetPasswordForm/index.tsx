import React, { Fragment, useEffect } from 'react'
import styles from './ResetPasswordForm.module.scss'
import Router, { useRouter } from 'next/router'
import FormInput from '../Form/FormInput'
import SubmitButton from '../Form/SubmitButton'
import useUser from '../../hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPassword } from '../../services/auth.service'
import { toast } from 'react-toastify'
import { setFormErrors } from '../../helpers'

type Inputs = {
    email: string
    password: string
    password_confirmation: string
}

const ResetPasswordForm = () => {
    const router = useRouter()
    const { userIsLoggedIn } = useUser()

    const resetSchema = yup.object().shape({
        email: yup.string().email('E-mail ei ole korrektne').required('E-mail on kohustuslik'),
        password: yup.string().required('Parool on kohustuslik'),
        password_confirmation: yup.string()
            .required('Parooli kordamine on kohustuslik')
            .oneOf([yup.ref('password'), null], 'Paroolid ei ühti'),
    }).required()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: yupResolver(resetSchema),
    })

    useEffect(() => {
        if (userIsLoggedIn) {
            Router.replace('/')
        }
    }, [userIsLoggedIn])

    const handleFormSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
        const { email, password } = values

        console.log(values)

        /*await forgotPassword(email)
            .then((res) => {
                toast.success('E-mail saadetud!')
                router.push('/login')
            })
            .catch((err) => {
                if (err.response?.data) {
                    if (err.response?.data?.errors) {
                        setFormErrors(err.response.data.errors, setError)
                        toast.error('E-mail saatmine ebaõnnestus!')
                    } else {
                        if (err.response.data === 'passwords.user') {
                            toast.error('Sisestatud e-mailiga kasutajat ei leitud!')
                        } else toast.error('E-mail saatmine ebaõnnestus!')
                    }
                } else toast.error('E-mail saatmine ebaõnnestus!')
            })*/
    }

    return (
        <Fragment>
            <div className={styles.ResetPasswordForm}>
                <div className={styles.FormContainer}>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className={styles.FormInput}>
                            <FormInput
                                name={'email'}
                                id={'email'}
                                label={'E-mail'}
                                type={'email'}
                                disabled={isSubmitting}
                                required={true}
                                error={errors.email?.message}
                                register={register}
                            />
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
                            <SubmitButton title={'Kinnita'} submitting={isSubmitting} />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ResetPasswordForm
