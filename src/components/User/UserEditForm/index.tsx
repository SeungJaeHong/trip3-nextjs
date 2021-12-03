import React from "react"
import styles from "./UserEditForm.module.scss"
import Router from "next/router"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast"
import { useForm, SubmitHandler } from "react-hook-form"
import useUser from "../../../hooks"
import FormInput from "../../Form/FormInput"
import SubmitButton from "../../Form/SubmitButton"
import {UserProfile} from "../../../types"
import FormTextarea from "../../Form/FormTextarea"
import FormRadioButton from "../../Form/FormRadioButton"
import {updateUserProfile} from "../../../services/user.service"
import {setFormErrors} from "../../../helpers"

type Inputs = {
    name: string,
    email: string,
    password: string
    password_confirmation: string
    description: string
    gender: number
    birthyear: number
    facebook: string
    instagram: string
    twitter: string
    homepage: string
}

const UserEditForm = (userProfile: UserProfile) => {
    const { user, mutate } = useUser()
    const registerSchema = yup.object().shape({
        name: yup.string().required('Kasutajanimi on kohustuslik'),
        email: yup.string().email('E-post ei ole korrektne').required('E-post on kohustuslik'),
        password: yup.string(),
        password_confirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Paroolid ei ühti'),
        birthyear: yup.number().max(new Date().getFullYear(), 'Valesti sisestatud aasta').min(1900, 'Valesti sisestatud aasta'),
        facebook: yup.string().url('Ei ole korrektne url'),
        instagram: yup.string().url('Ei ole korrektne url'),
        twitter: yup.string().url('Ei ole korrektne url'),
        homepage: yup.string().url('Ei ole korrektne url')
    }).required()

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name:userProfile.name,
            email: userProfile.email,
            description: userProfile.description,
            gender: userProfile.gender ? userProfile.gender : undefined,
            birthyear: userProfile.birthYear,
            facebook: userProfile.contact_facebook,
            instagram: userProfile.contact_instagram,
            twitter: userProfile.contact_twitter,
            homepage: userProfile.contact_homepage,
        },
        criteriaMode: "all",
        shouldFocusError: true
    })

    const handleUpdate: SubmitHandler<Inputs> = async (values: Inputs) => {

        console.log(values)

        const resp = await updateUserProfile(userProfile.id, values).then(res => {
            //Router.push('/user/' + userProfile.id)
            toast.success(
                'Profiili uuendamine õnnestus!',
                {
                    duration: 3000
                }
            )
        }).catch(err => {
            if (err.response?.data?.errors) {
                setFormErrors(err.response?.data?.errors, setError)
            }
            toast.error('Profiili uuendamine ebaõnnestus!')
        })
    }

    return (
        <div className={styles.UserEditForm}>
            <div className={styles.FormContainer}>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <div className={styles.SubHeading}>
                        Profiilipilt
                    </div>
                    <div className={styles.FormInput}>
                        Imageupload
                    </div>
                    <div className={styles.SubHeading}>
                        Kasutaja andmed
                    </div>
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
                            error={errors.password_confirmation?.message}
                            register={register} />
                    </div>
                    <div className={styles.SubHeading}>
                        Üldinfo
                    </div>
                    <div className={styles.FormInput}>
                        <div className={styles.TwoColField}>
                            <div className={styles.GenderField}>
                                <div className={styles.GenderLabel}>
                                    Sugu
                                </div>
                                <div className={styles.GenderInputs}>
                                    <FormRadioButton
                                        id={'male'}
                                        name={'gender'}
                                        label={'Mees'}
                                        type={'radio'}
                                        value={'1'}
                                        error={errors.gender?.message}
                                        disabled={isSubmitting}
                                        register={register} />

                                    <FormRadioButton
                                        id={'female'}
                                        name={'gender'}
                                        label={'Naine'}
                                        type={'radio'}
                                        value={'2'}
                                        error={errors.gender?.message}
                                        disabled={isSubmitting}
                                        register={register} />
                                </div>
                            </div>
                            <div className={styles.BirthYearField}>
                                <FormInput
                                    name={'birthyear'}
                                    id={'birthyear'}
                                    label={'Sünniaasta'}
                                    type={'number'}
                                    disabled={isSubmitting}
                                    error={errors.birthyear?.message}
                                    register={register} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.FormInput}>
                        <FormTextarea
                            name={'description'}
                            id={'description'}
                            label={'Lühikirjeldus'}
                            disabled={isSubmitting}
                            error={errors.description?.message}
                            register={register} />
                    </div>
                    <div className={styles.SubHeading}>
                        Kontaktinfo
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'facebook'}
                            id={'facebook'}
                            label={'Facebook'}
                            disabled={isSubmitting}
                            error={errors.facebook?.message}
                            register={register} />
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'instagram'}
                            id={'instagram'}
                            label={'Instagram'}
                            disabled={isSubmitting}
                            error={errors.instagram?.message}
                            register={register} />
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'twitter'}
                            id={'twitter'}
                            label={'Twitter'}
                            disabled={isSubmitting}
                            error={errors.twitter?.message}
                            register={register} />
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'homepage'}
                            id={'homepage'}
                            label={'Homepage'}
                            disabled={isSubmitting}
                            error={errors.homepage?.message}
                            register={register} />
                    </div>

                    <div className={styles.SubmitButton}>
                        <SubmitButton
                            title={'Salvesta'}
                            submitting={isSubmitting} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserEditForm