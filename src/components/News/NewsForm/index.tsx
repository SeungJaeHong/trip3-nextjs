import React, {useRef} from "react"
import styles from "./NewsForm.module.scss"
import Router from "next/router"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from "react-hot-toast"
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import FormInput from "../../Form/FormInput"
import SubmitButton from "../../Form/SubmitButton"
import FormImageUpload from "../../Form/FormImageUpload"
import FormMultiSelect from "../../Form/FormMultiSelect";
import {Destination} from "../../../types";
import FormCodeMirrorEditor from "../../Form/FormCodeMirrorEditor"

type Inputs = {
    title: string
    image: any
    body: string
    destinations: { value: string, label: string }[]
    topics: { value: string, label: string }[]
}

type Props = {
    destinations: Destination[]
    onSubmit: (values: any) => void
}

const NewsForm = ({destinations, onSubmit}: Props) => {
    const formRef = useRef<HTMLFormElement>(null)
    const registerSchema = yup.object().shape({
        title: yup.string().required('Pealkiri on kohustuslik'),
        image: yup.array().length(1, 'Lubatud failide arv on 1').nullable(),
        body: yup.string().required('Sisu on kohustuslik'),
        destinations: yup.array().nullable(),
        topics: yup.array().nullable()
    }).required()

    const { register, control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            title: '',
            body: '',
            destinations: [],
            topics: []
        },
        criteriaMode: 'firstError',
        shouldFocusError: true
    })

    const handleSave: SubmitHandler<Inputs> = async (values: Inputs) => {
        onSubmit(values)
    }

    const allOptions: { label: string; value: string }[] = destinations.map(destination => ({ label: destination.name, value: destination.id.toString() }))
    return (
        <div className={styles.NewsForm}>
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
                            register={register} />
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
                                        files={[]}
                                        onChange={field.onChange}
                                        error={fieldState.error?.message}
                                        disabled={isSubmitting} />
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
                                        label={'Sisu'}
                                        type={'news'}
                                        onChange={field.onChange}
                                        error={fieldState.error?.message}
                                        disabled={isSubmitting} />
                                )
                            }}
                        />
                    </div>
                    <div className={styles.FormInput}>
                        <Controller
                            name={'destinations'}
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormMultiSelect
                                        id={'destinations'}
                                        label={'Sihtkohad'}
                                        options={allOptions}
                                        placeholder={'Vali sihtkoht'}
                                        values={field.value}
                                        onChange={field.onChange}
                                        error={fieldState.error?.message}
                                        disabled={isSubmitting}
                                    />
                                )
                            }}
                        />
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

export default NewsForm