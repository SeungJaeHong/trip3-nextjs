import React from "react"
import styles from "./UserProfileDestinationForm.module.scss"
import Router from "next/router"
import toast from "react-hot-toast"
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import SubmitButton from "../../Form/SubmitButton"
import {Destination} from "../../../types"
import {setFormErrors} from "../../../helpers"
import FormMultiSelect from "../../Form/FormMultiSelect"

type Inputs = {
    visited: { value: string, label: string }[]
    wantsToGo: { value: string, label: string }[]
}

type Props = {
    visited?: Destination[]
    wantsToGo?: Destination[]
}

const UserProfileDestinationForm = ({visited, wantsToGo}: Props) => {
    const { watch, register, handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        defaultValues: {
            visited: visited ? visited?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
            wantsToGo: wantsToGo ? wantsToGo?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
        }
    })

    const handleUpdate: SubmitHandler<Inputs> = async (values: Inputs) => {

        console.log(values)

        /*await updateUserProfile(userProfile.id, values).then(res => {
            Router.push('/user/' + userProfile.id)
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
        })*/
    }

    const visitedOptions: { value: string, label: string }[] = (visited && visited?.length > 0)
        ? visited.map(destination => ({ label: destination.name, value: destination.id.toString() }))
        : []

    const wantsToGoOptions: { value: string, label: string }[] = (wantsToGo && wantsToGo?.length > 0)
        ? wantsToGo.map(destination => ({ label: destination.name, value: destination.id.toString() }))
        : []

    return (
        <div className={styles.UserProfileDestinationForm}>
            <div className={styles.FormContainer}>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <div className={styles.SubHeading}>
                        Olen käinud
                    </div>
                    <div className={styles.FormInput}>
                        <Controller
                            name={'visited'}
                            control={control}
                            render={({ field, fieldState, formState }) => {
                                return (
                                    <FormMultiSelect
                                        id={'visited'}
                                        options={visitedOptions}
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
                    <div className={styles.SubHeading}>
                        Tahan minna
                    </div>
                    <div className={styles.FormInput}>
                        <Controller
                            name={'wantsToGo'}
                            control={control}
                            render={({ field, fieldState, formState }) => {
                                return (
                                    <FormMultiSelect
                                        id={'wantsToGo'}
                                        options={wantsToGoOptions}
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

export default UserProfileDestinationForm