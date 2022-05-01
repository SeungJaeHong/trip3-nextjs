import React, { Fragment, useEffect } from 'react'
import styles from './ResetPasswordForm.module.scss'
import Router, { useRouter } from 'next/router'
import FormInput from '../Form/FormInput'
import SubmitButton from '../Form/SubmitButton'
import useUser from '../../hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPassword } from '../../services/auth.service'
import { toast } from 'react-toastify'
import { setFormErrors } from '../../helpers'

type Inputs = {
    email: string
    password: string
    password_confirmation: string
}

type Props = {
    disabled: boolean
}

const ResetPasswordForm = ({ disabled }: Props) => {
    const router = useRouter()
    const { userIsLoggedIn } = useUser()
    const email = String(router.query?.email)

    const resetSchema = yup
        .object()
        .shape({
            email: yup.string().email('E-mail ei ole korrektne').required('E-mail on kohustuslik'),
            password: yup.string().required('Parool on kohustuslik').min(8, 'Vähemalt 8 tähemärki'),
            password_confirmation: yup
                .string()
                .required('Parooli kordamine on kohustuslik')
                .oneOf([yup.ref('password'), null], 'Paroolid ei ühti'),
        })
        .required()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: yupResolver(resetSchema),
        defaultValues: {
            email: email
        }
    })

    useEffect(() => {
        if (userIsLoggedIn) {
            Router.replace('/')
        }
    }, [userIsLoggedIn])

    const handleFormSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
        if (disabled) return false

        const { email, password } = values
        const token = String(router.query?.token)
        await resetPassword(email, password, token)
            .then((res) => {
                toast.success('Parool muudetud!')
                router.push('/')
            })
            .catch((err) => {
                if (err.response?.data?.errors) {
                    setFormErrors(err.response.data.errors, setError)
                }
                toast.error('Parooli taastamine ebaõnnestus!')
            })
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
                                register={register}
                            />
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
                                register={register}
                            />
                        </div>
                        <div className={styles.SubmitButton}>
                            <SubmitButton title={'Kinnita'} submitting={isSubmitting} disabled={disabled} />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

ResetPasswordForm.defaultProps = {
    disabled: false,
}

export default ResetPasswordForm
