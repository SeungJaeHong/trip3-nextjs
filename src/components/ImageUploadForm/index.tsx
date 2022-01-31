import React from "react"
import styles from "./ImageUploadForm.module.scss"
import FormInput from "../Form/FormInput"
import SubmitButton from "../Form/SubmitButton"
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from '@hookform/resolvers/yup'
import {Destination} from "../../types"
import FormMultiSelect from "../Form/FormMultiSelect"
import FormImageUpload from "../Form/FormImageUpload"

type Inputs = {
    image: any
    title: string,
    destinations: { value: string, label: string }[]
}

type Props = {
    destinations: Destination[]
    onSubmit: (image: File, title: string, destination: Destination[]) => void
    selectedDestination?: Destination
}

const ImageUploadForm = ({destinations, onSubmit, selectedDestination}: Props) => {
    const imageSchema = yup.object().shape({
        image: yup.array().required('Pilt on kohustuslik').length(1, 'Lubatud failide arv on 1'),
        title: yup.string().required('Pealkiri on kohustuslik'),
        destinations: yup.array().required('Sihtkoht on kohustuslik').min(1, 'Sihtkoht on kohustuslik'),
    }).required()

    const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(imageSchema),
        defaultValues: {
            destinations: selectedDestination !== undefined ? [{label: selectedDestination.name, value: selectedDestination.id.toString()}] : []
        }
    })

    const valuesToDestination = (values: { value: string, label: string }[]): Destination[] => {
        const ids: Number[] = values.map(value => parseInt(value.value))
        return destinations.filter(destination => ids.indexOf(destination.id) !== -1)
    }

    const handleSave: SubmitHandler<Inputs> = async (values: Inputs) => {
        const { image, title, destinations } = values
        const destinationValues = valuesToDestination(destinations)
        onSubmit(image[0], title, destinationValues)
    }

    const allOptions: { label: string; value: string }[] = destinations.map(destination => ({ label: destination.name, value: destination.id.toString() }))
    return (
        <div className={styles.ImageUploadForm}>
            <div className={styles.FormContainer}>
                <form onSubmit={handleSubmit(handleSave)}>
                    <div className={styles.FormInput}>
                        <Controller
                            name={'image'}
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormImageUpload
                                        id={'image'}
                                        label={'Pilt'}
                                        onChange={field.onChange}
                                        error={fieldState.error?.message}
                                        disabled={isSubmitting}/>
                                )
                            }}
                        />
                    </div>
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

export default ImageUploadForm