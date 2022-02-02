import React from "react"
import styles from "./UserProfileDestinationForm.module.scss"
import Router from "next/router"
import {toast} from 'react-toastify'
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import SubmitButton from "../../Form/SubmitButton"
import {Destination} from "../../../types"
import {setFormErrors} from "../../../helpers"
import FormMultiSelect from "../../Form/FormMultiSelect"
import {updateMyDestinations} from "../../../services/user.service"
import useUser from "../../../hooks"

type Inputs = {
    visited: { value: string, label: string }[]
    wantsToGo: { value: string, label: string }[]
}

type Props = {
    options: Destination[] | []
    visited?: Destination[]
    wantsToGo?: Destination[]
}

const UserProfileDestinationForm = ({visited, wantsToGo, options}: Props) => {
    const { user } = useUser()
    const { handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        defaultValues: {
            visited: visited ? visited?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
            wantsToGo: wantsToGo ? wantsToGo?.map(d => { return {label: d.name, value: d.id.toString()}}) : [],
        }
    })

    const handleUpdate: SubmitHandler<Inputs> = async (values: Inputs) => {
        const visitedIds = values?.visited.map(value => {
            return Number(value.value)
        })

        const wantsToGoIds = values?.wantsToGo.map(value => {
            return Number(value.value)
        })

        await updateMyDestinations(visitedIds, wantsToGoIds).then(res => {
            // @ts-ignore
            Router.push('/user/' + user.id)
            toast.success('Sihtkohtade uuendamine õnnestus!')
        }).catch(err => {
            if (err.response?.data?.errors) {
                setFormErrors(err.response?.data?.errors, setError)
            }
            toast.error('Sihtkohtade uuendamine ebaõnnestus!')
        })
    }

    const allOptions: { label: string; value: string }[] = options.map(destination => ({ label: destination.name, value: destination.id.toString() }))
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

export default UserProfileDestinationForm