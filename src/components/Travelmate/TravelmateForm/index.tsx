import React, {useState} from "react"
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

type Inputs = {
    title: string
    body: string
    gender: string
    start: string
    startMonth: string
    startDate: string
    endDate: string
    dateRange: { startDate: string, endDate: string }
    destinations: { value: string, label: string }[]
    topics: { value: string, label: string }[]
}

type Props = {
    travelmate?: TravelmateContent
    destinations: Destination[]
    topics: Topic[]
}

const TravelmateForm = ({travelmate, destinations, topics}: Props) => {
    const [showDateRange, setShowDateRange] = useState<boolean>(false)
    const router = useRouter()
    const forumPostSchema = yup.object().shape({
        title: yup.string().required('Pealkiri on kohustuslik'),
        body: yup.string().required('Sisu on kohustuslik'),
        gender: yup.string(),
        start: yup.string(),
        startMonth: yup.string().nullable(),
        destinations: yup.array().required(),
        topics: yup.array().nullable()
    }).required()

    const { watch, register, handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(forumPostSchema),
        defaultValues: {
            title: travelmate ? travelmate.title : '',
            body: travelmate ? travelmate.body : '',
            gender: '',
            start: 'start_and_end',
            startMonth: '3_2022',
            dateRange: { startDate: '2022-02-15', endDate: '2022-02-25' },
            destinations: travelmate ? travelmate.destinations?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
            topics: travelmate ? travelmate.topics?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
        }
    })

    const genderValue = watch('gender')
    const startDateValue = watch('start')
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
            label: 'Umbkaudne alguse aeg'
        },
    ]

    const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
        console.log('onSubmit', values)
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
                            label={'Pealkiri*'}
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
                                        label={'Sihtkohad*'}
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
                                            [styles.RadioButtonChecked]: startDateValue === startValue.value
                                        })} key={startValue.value}>
                                            <FormRadioButton
                                                id={startValue.value}
                                                name={'start'}
                                                label={startValue.label}
                                                type={'radio'}
                                                value={startValue.value}
                                                error={errors.start?.message}
                                                disabled={isSubmitting}
                                                register={register} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {startDateValue === 'start' &&
                            <div className={styles.SelectionInfo}>
                                <Controller
                                    name={'startMonth'}
                                    control={control}
                                    render={({ field, fieldState, formState }) => {
                                        return (
                                            <TravelmateStartDateSelection
                                                id={'startMonth'}
                                                value={startMonth}
                                                onChange={field.onChange}
                                                disabled={isSubmitting}
                                            />
                                        )
                                    }}
                                />
                            </div>
                        }
                        {startDateValue === 'start_and_end' &&
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
                                        label={'Sisu*'}
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