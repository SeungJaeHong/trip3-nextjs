import React from "react"
import styles from "./TravelmateForm.module.scss"
import clsx from "clsx"
import FormInput from "../../Form/FormInput"
import SubmitButton from "../../Form/SubmitButton"
import {SubmitHandler, useForm, Controller} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import FormRadioButton from "../../Form/FormRadioButton"
import FormRichTextEditor from "../../Form/FormRichTextEditor"
import {Destination, Topic, TravelmateContent} from "../../../types"
import FormMultiSelect from "../../Form/FormMultiSelect"
import {useRouter} from 'next/router'
import TravelmateStartDateSelection from "../TravelmateStartDateSelection"
import FormDateRangePicker from "../../Form/FormDateRangePicker"
import FormSelect from "../../Form/FormSelect"
import {setFormErrors} from "../../../helpers"
import {toast} from "react-toastify"
import {storeTravelmate, updateTravelmate} from "../../../services/travelmate.service"

type Inputs = {
    title: string
    body: string
    gender: string
    startType: 'start_and_end' | 'start'
    startMonth: string
    startDate: string
    endDate: string
    dateRange: { startDate: string, endDate: string }
    destinations: { value: string, label: string }[]
    topics: { value: string, label: string }[]
    duration: string
}

type Props = {
    travelmate?: TravelmateContent
    destinations: Destination[]
    topics: Topic[]
    durationOptions: {value: string, label: string}[]
    monthOptions: {value: string, label: string}[]
}

const TravelmateForm = ({travelmate, destinations, topics, durationOptions, monthOptions}: Props) => {
    const router = useRouter()
    const travelmateSchema = yup.object().shape({
        title: yup.string().required('Pealkiri on kohustuslik'),
        body: yup.string().required('Sisu on kohustuslik'),
        gender: yup.string(),
        startType: yup.string(),
        startMonth: yup.string().nullable(),
        destinations: yup.array().required('Sihtkoht on kohustuslik').min(1, 'Sihtkoht on kohustuslik'),
        topics: yup.array().nullable(),
        duration: yup.string().nullable().when('startType', {
            is: 'start',
            then: yup.string().required('Kestvus on valimata'),
        }),
        dateRange: yup.object().shape({
            startDate: yup.string().nullable(),
            endDate: yup.string().nullable()
        }).nullable().when('startType', {
            is: 'start_and_end',
            then: yup.object().test(
                'dateRangeCheck',
                'Kuupäeva vahemik on valimata',
                (value, context) => {
                    return value.startDate && value?.endDate
                },
            )
        })
    }).required()

    const { watch, register, handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(travelmateSchema),
        defaultValues: {
            title: travelmate?.title ?? '',
            body: travelmate?.body ?? '',
            gender: travelmate?.gender,
            startType: travelmate?.startType ?? 'start_and_end',
            startMonth: travelmate?.startMonth,
            dateRange: { startDate: travelmate?.startDate, endDate: travelmate?.endDate },
            duration: travelmate?.duration,
            destinations: travelmate ? travelmate.destinations?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
            topics: travelmate ? travelmate.topics?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
        }
    })

    const genderValue = watch('gender')
    const startTypeValue = watch('startType')
    const startMonth = watch('startMonth')
    const genderValues = [
        {
            value: '',
            label: 'Pole oluline'
        },
        {
            value: 'M',
            label: 'Mees'
        },
        {
            value: 'N',
            label: 'Naine'
        },
    ]

    const dateValues = [
        {
            value: 'start_and_end',
            label: 'Kindlad kuupäevad'
        },
        {
            value: 'start',
            label: 'Umbkaudne aeg'
        },
    ]

    const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
        const formData = {
            ...values,
            destinations: values.destinations.map((d) => parseInt(d.value)),
            topics: values?.topics.map((t) => parseInt(t.value)),
        }

        if (travelmate) {
            await updateTravelmate(travelmate, formData).then(res => {
                toast.success('Kuulutus muudetud!')
                router.push('/reisikaaslased/' + travelmate.slug)
            }).catch(err => {
                if (err.response?.data?.errors) {
                    setFormErrors(err.response.data.errors, setError)
                }

                toast.error('Kuulutuse muutmine ebaõnnestus!')
            })
        } else {
            await storeTravelmate(formData).then(res => {
                toast.success('Kuulutus lisatud!')
                router.push('/reisikaaslased')
            }).catch(err => {
                if (err.response?.data?.errors) {
                    setFormErrors(err.response.data.errors, setError)
                }

                toast.error('Kuulutuse lisamine ebaõnnestus!')
            })
        }
    }

    const destinationOptions: { value: string, label: string }[] = destinations.map(destination => ({ label: destination.name, value: destination.id.toString() }))
    const topicOptions: { value: string, label: string }[] = topics.map(topic => ({ label: topic.name, value: topic.id.toString() }))
    return (
        <div className={styles.TravelmateForm}>
            <div className={styles.FormContainer}>
                <form>
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
                            name={'destinations'}
                            control={control}
                            render={({ field, fieldState, formState }) => {
                                return (
                                    <FormMultiSelect
                                        id={'destinations'}
                                        options={destinationOptions}
                                        label={'Sihtkohad'}
                                        required={true}
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
                            name={'topics'}
                            control={control}
                            render={({ field, fieldState, formState }) => {
                                return (
                                    <FormMultiSelect
                                        id={'topics'}
                                        options={topicOptions}
                                        label={'Reisistiil'}
                                        placeholder={'Vali reisistiil'}
                                        values={field.value}
                                        onChange={field.onChange}
                                        error={fieldState.error?.message}
                                        disabled={isSubmitting}
                                    />
                                )
                            }}
                        />
                    </div>
                    <div className={styles.GenderSelection}>
                        <label>Mis soost kaaslast soovid leida?</label>
                        <div className={styles.FormRadioGroup}>
                            {genderValues.map(gender => {
                                return (
                                    <div className={clsx(styles.RadioButton, {
                                        [styles.RadioButtonChecked]: genderValue === gender.value
                                    })} key={gender.value}>
                                        <FormRadioButton
                                            id={gender.value}
                                            name={'gender'}
                                            label={gender.label}
                                            type={'radio'}
                                            value={gender.value}
                                            error={errors.gender?.message}
                                            disabled={isSubmitting}
                                            register={register} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.DateSelection}>
                        <div className={styles.SelectionContainer}>
                            <label>Planeeritud aeg</label>
                            <div className={styles.DateSelectionRadioGroup}>
                                {dateValues.map(startValue => {
                                    return (
                                        <div className={clsx(styles.RadioButton, {
                                            [styles.RadioButtonChecked]: startTypeValue === startValue.value
                                        })} key={startValue.value}>
                                            <FormRadioButton
                                                id={startValue.value}
                                                name={'startType'}
                                                label={startValue.label}
                                                type={'radio'}
                                                value={startValue.value}
                                                error={errors.startType?.message}
                                                disabled={isSubmitting}
                                                register={register} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {startTypeValue === 'start' &&
                            <>
                                <div className={styles.SelectionInfo}>
                                    <Controller
                                        name={'startMonth'}
                                        control={control}
                                        render={({ field, fieldState, formState }) => {
                                            return (
                                                <TravelmateStartDateSelection
                                                    id={'startMonth'}
                                                    options={monthOptions}
                                                    value={startMonth}
                                                    onChange={field.onChange}
                                                    disabled={isSubmitting}
                                                />
                                            )
                                        }}
                                    />
                                </div>
                                <div className={styles.DurationOptions}>
                                    <Controller
                                        name={'duration'}
                                        control={control}
                                        render={({ field, fieldState, formState }) => {
                                            return (
                                                <FormSelect
                                                    id={'duration'}
                                                    options={durationOptions}
                                                    label={'Kestvus'}
                                                    value={durationOptions.find(obj => obj.value === field.value)}
                                                    placeholder={'Vali kestvus'}
                                                    onChange={field.onChange}
                                                    error={fieldState.error?.message}
                                                    disabled={isSubmitting}
                                                />
                                            )
                                        }}
                                    />
                                </div>
                            </>
                        }
                        {startTypeValue === 'start_and_end' &&
                            <div className={styles.SelectionInfo}>
                                <Controller
                                    name={'dateRange'}
                                    control={control}
                                    render={({ field, fieldState, formState }) => {
                                        return (
                                            <FormDateRangePicker
                                                id={'dateRange'}
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={fieldState.error?.message}
                                                disabled={isSubmitting}
                                            />
                                        )
                                    }}
                                />
                            </div>
                        }
                    </div>
                    <div className={styles.FormInput}>
                        <Controller
                            name={'body'}
                            control={control}
                            render={({ field, fieldState, formState }) => {
                                return (
                                    <FormRichTextEditor
                                        id={'body'}
                                        label={'Sisu'}
                                        required={true}
                                        value={travelmate ? travelmate.body : ''}
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
                            onClick={handleSubmit(onSubmit)}
                            type={'button'}
                            title={'Salvesta'}
                            submitting={isSubmitting} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TravelmateForm