import React, { Fragment, useEffect } from 'react'
import styles from './ForgotPasswordForm.module.scss'
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
}

const ForgotPasswordForm = () => {
    const router = useRouter()

    const { userIsLoggedIn } = useUser()
    const loginSchema = yup
        .object()
        .shape({
            email: yup.string().email('Sisesta e-mail').required('E-mail on kohustuslik'),
        })
        .required()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: yupResolver(loginSchema),
    })

    useEffect(() => {
        if (userIsLoggedIn) {
            Router.replace('/')
        }
    }, [userIsLoggedIn])

    const handleSend: SubmitHandler<Inputs> = async (values: Inputs) => {
        const { email } = values
        await forgotPassword(email)
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
            })
    }

    return (
        <Fragment>
            <div className={styles.ForgotPasswordForm}>
                <div className={styles.FormContainer}>
                    <form onSubmit={handleSubmit(handleSend)}>
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
                        <div className={styles.SubmitButton}>
                            <SubmitButton title={'Saada'} submitting={isSubmitting} />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPasswordForm
