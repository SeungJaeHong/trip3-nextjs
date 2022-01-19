import React from "react"
import styles from "./ImageForm.module.scss"
import FormInput from "../Form/FormInput"
import SubmitButton from "../Form/SubmitButton"
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import {Destination} from "../../types"
import FormMultiSelect from "../Form/FormMultiSelect"

type Inputs = {
    title: string,
    destinations: { value: string, label: string }[]
}

type Props = {
    destinations: Destination[]
}

const ImageForm = ({destinations}: Props) => {
    const loginSchema = yup.object().shape({
        title: yup.string().required('Pealkiri on kohustuslik'),
        destinations: yup.array().required('Sihtkoht on kohustuslik').min(1, 'Sihtkoht on kohustuslik'),
    }).required()

    const { register, control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(loginSchema)
    })

    const handleSave: SubmitHandler<Inputs> = async (values: Inputs) => {
        const { title, destinations } = values

        console.log(values, 'values')
    }

    const allOptions: { label: string; value: string }[] = destinations?.map(destination => ({ label: destination.name, value: destination.id.toString() }))
    return (
        <div className={styles.ImageForm}>
            <div className={styles.FormContainer}>
                <form onSubmit={handleSubmit(handleSave)}>
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
                                        options={allOptions}
                                        placeholder={'Vali sihtkohad'}
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

export default ImageForm