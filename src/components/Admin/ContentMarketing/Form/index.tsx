import React, { useRef } from 'react'
import styles from './AdminContentMarketingForm.module.scss'
import {ContentMarketingFullPost} from '../../../../types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import FormInput from '../../../Form/FormInput'
import FormImageUpload from '../../../Form/FormImageUpload'
import FormCodeMirrorEditor from '../../../Form/FormCodeMirrorEditor'
import SubmitButton from '../../../Form/SubmitButton'
import Button from '../../../Button'
import {addContentMarketingPost, updateContentMarketingPost} from '../../../../services/admin.service'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import {setFormErrors} from "../../../../helpers";

type Inputs = {
    title: string
    image: File[]
    clientName: string
    url: string
    logo: File[]
    body: string
}

type Props = {
    item?: ContentMarketingFullPost
}

const AdminContentMarketingForm = ({ item }: Props) => {
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const newsSchema = yup
        .object()
        .shape({
            title: yup.string().required('Pealkiri on kohustuslik'),
            image:
                item && item.id
                    ? yup.array().length(1, 'Lubatud failide arv on 1').nullable()
                    : yup.array().length(1, 'Lubatud failide arv on 1').required('Pilt on kohustuslik'),
            body: yup.string().required('Sisu on kohustuslik'),
            clientName: yup.string().required('Klient on kohustuslik'),
            url: yup.string().url().required('Url on kohustuslik'),
            logo:
                item && item.id
                    ? yup.array().length(1, 'Lubatud failide arv on 1').nullable()
                    : yup.array().length(1, 'Lubatud failide arv on 1').required('Logo on kohustuslik'),
        })
        .required()

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm<Inputs>({
        resolver: yupResolver(newsSchema),
        defaultValues: {
            title: item?.title,
            body: item?.bodyRaw,
            clientName: item?.clientName,
            url: item?.url,
        },
        criteriaMode: 'firstError',
        shouldFocusError: true,
    })

    const handleSave: SubmitHandler<Inputs> = async (values: Inputs) => {
        const formData = {
            ...values,
            image: values.image ? values.image[0] : undefined,
            logo: values.logo ? values.logo[0] : undefined,
        }

        if (item) {
            await updateContentMarketingPost(item, formData)
                .then((res) => {
                    router.push('/admin/content-marketing')
                    toast.success('Postitus muudetud!')
                })
                .catch((err) => {
                    console.log(err.response)

                    if (err.response?.data) {
                        if (err.response?.data?.errors) {
                            setFormErrors(err.response.data.errors, setError)
                            toast.error('Postituse muutmine ebaõnnestus!')
                        }
                    } else toast.error('Postituse muutmine ebaõnnestus!')
                })
        } else {
            await addContentMarketingPost(formData)
                .then((res) => {
                    router.push('/admin/content-marketing')
                    toast.success('Uus postitus loodud!')
                })
                .catch((err) => {
                    console.log(err.response)

                    if (err.response?.data) {
                        if (err.response?.data?.errors) {
                            setFormErrors(err.response.data.errors, setError)
                            toast.error('Postituse lisamine ebaõnnestus!')
                        }
                    } else toast.error('Postituse lisamine ebaõnnestus!')
                })
        }
    }

    return (
        <div className={styles.Container}>
            <div className={styles.FormContainer}>
                <form onSubmit={handleSubmit(handleSave)} ref={formRef}>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'title'}
                            id={'title'}
                            label={'Pealkiri'}
                            disabled={isSubmitting}
                            required={true}
                            error={errors.title?.message}
                            register={register}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <Controller
                            name={'image'}
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormImageUpload
                                        id={'image'}
                                        label={'Taustapilt'}
                                        required={true}
                                        files={item?.backgroundImageUrl ? [item.backgroundImageUrl] : []}
                                        onChange={field.onChange}
                                        error={fieldState.error?.message}
                                        disabled={isSubmitting}
                                    />
                                )
                            }}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'clientName'}
                            id={'clientName'}
                            label={'Kliendi nimi'}
                            disabled={isSubmitting}
                            required={true}
                            error={errors.clientName?.message}
                            register={register}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput
                            name={'url'}
                            id={'url'}
                            label={'Url'}
                            disabled={isSubmitting}
                            required={true}
                            error={errors.url?.message}
                            register={register}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <Controller
                            name={'logo'}
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormImageUpload
                                        id={'logo'}
                                        label={'Logo (.svg)'}
                                        required={true}
                                        files={item?.clientLogoUrl ? [item.clientLogoUrl] : []}
                                        onChange={field.onChange}
                                        error={fieldState.error?.message}
                                        disabled={isSubmitting}
                                        accept={['image/svg', 'image/svg+xml']}
                                    />
                                )
                            }}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <Controller
                            name={'body'}
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormCodeMirrorEditor
                                        id={'body'}
                                        name={'body'}
                                        value={field.value}
                                        label={'Sisu'}
                                        required={true}
                                        type={'flight'}
                                        onChange={field.onChange}
                                        error={fieldState.error?.message}
                                        disabled={isSubmitting}
                                    />
                                )
                            }}
                        />
                    </div>
                    <div className={styles.Buttons}>
                        <Button
                            title={'Tagasi'}
                            cancel={true}
                            onClick={() => router.back()}
                            className={styles.Button}
                        />
                        <div className={styles.Button}>
                            <SubmitButton title={'Salvesta'} submitting={isSubmitting} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminContentMarketingForm
