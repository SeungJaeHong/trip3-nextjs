import React, { useRef } from 'react'
import styles from './UserEditForm.module.scss'
import Router from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import FormInput from '../../Form/FormInput'
import SubmitButton from '../../Form/SubmitButton'
import { UserProfile } from '../../../types'
import FormTextarea from '../../Form/FormTextarea'
import FormRadioButton from '../../Form/FormRadioButton'
import { updateUserProfile } from '../../../services/user.service'
import { setFormErrors } from '../../../helpers'
import FormCheckbox from '../../Form/FormCheckbox'
import FormImageUpload from '../../Form/FormImageUpload'

type Inputs = {
    image: any
    name: string
    email: string
    password: string
    password_confirmation: string
    description: string
    gender: string
    birthyear: number
    facebook: string
    instagram: string
    twitter: string
    homepage: string
    notify_message: boolean
    notify_follow: boolean
}

type Props = {
    user: UserProfile,
    onUpdateSuccess?: (user: UserProfile) => void
}

const UserEditForm = ({user, onUpdateSuccess}: Props) => {
    const formRef = useRef<HTMLFormElement>(null)
    const registerSchema = yup
        .object()
        .shape({
            image: yup.array().length(1, 'Lubatud failide arv on 1').nullable(),
            name: yup.string().required('Kasutajanimi on kohustuslik'),
            email: yup.string().email('E-post ei ole korrektne').required('E-post on kohustuslik'),
            password: yup.string(),
            password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Paroolid ei ühti'),
            birthyear: yup
                .number()
                .max(new Date().getFullYear(), 'Valesti sisestatud aasta')
                .min(1900, 'Valesti sisestatud aasta')
                .nullable(),
            gender: yup.string().nullable(),
            facebook: yup.string().url('Ei ole korrektne url').nullable(),
            instagram: yup.string().url('Ei ole korrektne url').nullable(),
            twitter: yup.string().url('Ei ole korrektne url').nullable(),
            homepage: yup.string().url('Ei ole korrektne url').nullable(),
        })
        .required()

    const {
        register,
        control,
        handleSubmit,
        setError,
        setFocus,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            description: user.description,
            gender: user.gender ? String(user.gender) : undefined,
            birthyear: user.birthYear,
            facebook: user.contact_facebook,
            instagram: user.contact_instagram,
            twitter: user.contact_twitter,
            homepage: user.contact_homepage,
            notify_message: user.notify_message,
            notify_follow: user.notify_follow,
        },
        criteriaMode: 'firstError',
        shouldFocusError: true,
    })

    /*useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstError = Object.keys(errors)[0]

            // @ts-ignore
            setFocus(firstError)
        }
    }, [errors, setFocus])*/

    const handleUpdate: SubmitHandler<Inputs> = async (values: Inputs) => {
        await updateUserProfile(user, values)
            .then((res) => {
                if (onUpdateSuccess) {
                    onUpdateSuccess(res.data)
                } else {
                    Router.push('/user/' + user.id)
                    toast.success('Profiili uuendamine õnnestus!')
                }
            })
            .catch((err) => {
                if (err.response?.data?.errors) {
                    setFormErrors(err.response?.data?.errors, setError)
                }
                formRef.current?.scrollIntoView()
                toast.error('Profiili uuendamine ebaõnnestus!')
            })
    }

    return (
        <div className={styles.UserEditForm}>
            <div className={styles.FormContainer}>
                <form onSubmit={handleSubmit(handleUpdate)} ref={formRef}>
                    <div className={styles.SubHeading}>Profiilipilt</div>
                    <div className={styles.FormInput}>
                        <Controller
                            name={'image'}
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormImageUpload
                                        id={'image'}
                                        files={user?.avatar ? [user?.avatar] : []}
                                        onChange={field.onChange}
                                        error={fieldState.error?.message}
                                        disabled={isSubmitting}
                                    />
                                )
                            }}
                        />
                    </div>
                    <div className={styles.SubHeading}>Kasutaja andmed</div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'name'}
                            id={'name'}
                            label={'Kasutajanimi'}
                            disabled={isSubmitting}
                            required={true}
                            error={errors.name?.message}
                            register={register}
                        />
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
                            error={errors.password_confirmation?.message}
                            register={register}
                        />
                    </div>
                    <div className={styles.SubHeading}>Üldinfo</div>
                    <div className={styles.FormInput}>
                        <div className={styles.TwoColField}>
                            <div className={styles.GenderField}>
                                <div className={styles.GenderLabel}>Sugu</div>
                                <div className={styles.GenderInputs}>
                                    <FormRadioButton
                                        id={'male'}
                                        name={'gender'}
                                        label={'Mees'}
                                        type={'radio'}
                                        value={'1'}
                                        error={errors.gender?.message}
                                        disabled={isSubmitting}
                                        register={register}
                                    />

                                    <FormRadioButton
                                        id={'female'}
                                        name={'gender'}
                                        label={'Naine'}
                                        type={'radio'}
                                        value={'2'}
                                        error={errors.gender?.message}
                                        disabled={isSubmitting}
                                        register={register}
                                    />
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
                                    register={register}
                                />
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
                            register={register}
                        />
                    </div>
                    <div className={styles.SubHeading}>E-posti teavitused</div>
                    <div className={styles.FormInput}>
                        <FormCheckbox
                            name={'notify_message'}
                            id={'notify_message'}
                            label={'Teavita mind, kui keegi on saatnud mulle sõnumi'}
                            disabled={isSubmitting}
                            error={errors.notify_message?.message}
                            register={register}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <FormCheckbox
                            name={'notify_follow'}
                            id={'notify_follow'}
                            label={'Teavita mind, kui keegi on kirjutanud kommentaari postitusele, mida ma jälgin'}
                            disabled={isSubmitting}
                            error={errors.notify_follow?.message}
                            register={register}
                        />
                    </div>
                    <div className={styles.SubHeading}>Kontaktinfo</div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'facebook'}
                            id={'facebook'}
                            label={'Facebook'}
                            disabled={isSubmitting}
                            error={errors.facebook?.message}
                            register={register}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'instagram'}
                            id={'instagram'}
                            label={'Instagram'}
                            disabled={isSubmitting}
                            error={errors.instagram?.message}
                            register={register}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'twitter'}
                            id={'twitter'}
                            label={'Twitter'}
                            disabled={isSubmitting}
                            error={errors.twitter?.message}
                            register={register}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'homepage'}
                            id={'homepage'}
                            label={'Koduleht'}
                            disabled={isSubmitting}
                            error={errors.homepage?.message}
                            register={register}
                        />
                    </div>

                    <div className={styles.SubmitButton}>
                        <SubmitButton title={'Salvesta'} submitting={isSubmitting} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserEditForm
