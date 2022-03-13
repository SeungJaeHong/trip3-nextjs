import React, {useRef} from "react"
import styles from "./FlightForm.module.scss"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import FormInput from "../../Form/FormInput"
import SubmitButton from "../../Form/SubmitButton"
import FormImageUpload from "../../Form/FormImageUpload"
import FormMultiSelect from "../../Form/FormMultiSelect"
import {Destination, FlightContent, Tag} from "../../../types"
import FormCodeMirrorEditor from "../../Form/FormCodeMirrorEditor"

type Inputs = {
    title: string
    image: File[]
    body: string
    destinations: { value: string, label: string }[]
    tags: { value: string, label: string }[]
}

type Props = {
    flight?: FlightContent
    destinations: Destination[]
    tags: Tag[]
    onSubmit: (values: any) => void
}

const FlightForm = ({flight, destinations, tags, onSubmit}: Props) => {
    const formRef = useRef<HTMLFormElement>(null)
    const newsSchema = yup.object().shape({
        title: yup.string().required('Pealkiri on kohustuslik'),
        image: (flight && flight.id) ? yup.array().length(1, 'Lubatud failide arv on 1').nullable() : yup.array().length(1, 'Lubatud failide arv on 1').required('Pilt on kohustuslik'),
        body: yup.string().required('Sisu on kohustuslik'),
        destinations: yup.array().required('Sihtkoht on kohustuslik').min(1, 'Sihtkoht on kohustuslik'),
        tags: yup.array().nullable()
    }).required()

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(newsSchema),
        defaultValues: {
            title: flight?.title,
            body: flight?.bodyRaw,
            destinations: flight ? flight.destinations?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
            tags: flight ? flight.tags?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
        },
        criteriaMode: 'firstError',
        shouldFocusError: true
    })

    const handleSave: SubmitHandler<Inputs> = async (values: Inputs) => {
        const formData = {
            ...values,
            image: values.image[0],
            destinations: values.destinations.map((d) => parseInt(d.value)),
            tags: values?.tags.map((t) => parseInt(t.value)),
        }

        onSubmit(formData)
    }

    const allDestinationOptions: { label: string; value: string }[] = destinations.map(destination => ({ label: destination.name, value: destination.id.toString() }))
    const allTagOptions: { label: string; value: string }[] = tags?.map(tag => ({ label: tag.name, value: tag.id.toString() }))
    return (
        <div className={styles.FlightForm}>
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
                                        files={flight?.backgroundImageUrl ? [flight.backgroundImageUrl] : []}
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
                                        value={field.value}
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
                                        options={allDestinationOptions}
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
                    <div className={styles.FormInput}>
                        <Controller
                            name={'tags'}
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormMultiSelect
                                        id={'tags'}
                                        label={'Sildid'}
                                        options={allTagOptions}
                                        placeholder={'Vali sildid'}
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

export default FlightForm