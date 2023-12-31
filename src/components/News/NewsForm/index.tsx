import React, {useRef} from "react"
import styles from "./NewsForm.module.scss"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import FormInput from "../../Form/FormInput"
import SubmitButton from "../../Form/SubmitButton"
import FormImageUpload from "../../Form/FormImageUpload"
import FormMultiSelect from "../../Form/FormMultiSelect"
import {Destination, NewsContent, Topic} from "../../../types"
import FormCodeMirrorEditor from "../../Form/FormCodeMirrorEditor"

type Inputs = {
    title: string
    image: File[]
    body: string
    destinations: { value: string, label: string }[]
    topics: { value: string, label: string }[]
}

type Props = {
    news?: NewsContent
    destinations: Destination[]
    topics: Topic[]
    onSubmit: (title: string, body: string, destination: Destination[], image?: File, topics?: Topic[]) => void
}

const NewsForm = ({news, destinations, topics, onSubmit}: Props) => {
    const formRef = useRef<HTMLFormElement>(null)
    const newsSchema = yup.object().shape({
        title: yup.string().required('Pealkiri on kohustuslik'),
        image: (news && news.id) ? yup.array().length(1, 'Lubatud failide arv on 1').nullable() : yup.array().length(1, 'Lubatud failide arv on 1').required('Pilt on kohustuslik'),
        body: yup.string().required('Sisu on kohustuslik'),
        destinations: yup.array().required('Sihtkoht on kohustuslik').min(1, 'Sihtkoht on kohustuslik'),
        topics: yup.array().nullable()
    }).required()

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(newsSchema),
        defaultValues: {
            title: news?.title,
            body: news?.bodyRaw,
            destinations: news ? news.destinations?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
            topics: news ? news.topics?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
        },
        criteriaMode: 'firstError',
        shouldFocusError: true
    })

    const valuesToDestination = (values: { value: string, label: string }[]): Destination[] => {
        const ids: Number[] = values.map(value => parseInt(value.value))
        return destinations.filter(destination => ids.indexOf(destination.id) !== -1)
    }

    const valuesToTopics = (values: { value: string, label: string }[]): Topic[] => {
        const ids: Number[] = values.map(value => parseInt(value.value))
        return topics.filter(topic => ids.indexOf(topic.id) !== -1)
    }

    const handleSave: SubmitHandler<Inputs> = async (values: Inputs) => {
        const {title, body, destinations, topics, image} = values
        const destinationValues = valuesToDestination(destinations)
        let topicValues = undefined
        if (topics) {
            topicValues = valuesToTopics(topics)
        }

        onSubmit(title, body, destinationValues, image ? image[0] : undefined, topicValues)
    }

    const allDestinationOptions: { label: string; value: string }[] = destinations.map(destination => ({ label: destination.name, value: destination.id.toString() }))
    const allTopicOptions: { label: string; value: string }[] = topics?.map(topic => ({ label: topic.name, value: topic.id.toString() }))
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
                                        files={news?.backgroundImageUrl ? [news.backgroundImageUrl] : []}
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
                            name={'topics'}
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormMultiSelect
                                        id={'topics'}
                                        label={'Valdkonnad'}
                                        options={allTopicOptions}
                                        placeholder={'Vali valdkond'}
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