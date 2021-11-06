import React, {Fragment, useEffect} from "react"
import styles from "./ForumPostForm.module.scss"
import clsx from "clsx"
import Router from "next/router"
import FormInput from "../../Form/FormInput"
import SubmitButton from "../../Form/SubmitButton"
import toast from 'react-hot-toast'
import {setFormErrors} from "../../../helpers"
import {login} from "../../../services/auth.service"
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import FormRadioButton from "../../Form/FormRadioButton";
import FormRichTextEditor from "../../Form/FormRichTextEditor";
import {Content} from "../../../types";

type Inputs = {
    category: string,
    title: string,
    body: string
}

type Props = {
    post?: Content
}

const ForumPostForm = ({post}: Props) => {
    const forumPostSchema = yup.object().shape({
        category: yup.string().required('Kategooria on kohustuslik'),
        title: yup.string().required('Pealkiri on kohustuslik'),
        body: yup.string().required('Sisu on kohustuslik'),
    }).required()

    const { watch, register, handleSubmit, setError, control, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(forumPostSchema)
    })

    const categoryValue = watch('category', 'forum')

    const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
        const { category, title, body } = values
        console.log(values, 'onsubmitValues')

        /*const resp = await login(name, password, remember_me).then(res => {
            dispatch(setUser(res.data))
            toast.success('Uus postitus loodud!')
        }).catch(err => {
            if (err.response?.data?.errors) {
                setFormErrors(err.response.data.errors, setError)
            }
            toast.error('Salvestamine ebaõnnestus!')
        })*/
    }

    const categories = [
        {
            value: 'forum',
            label: 'Üldfoorum'
        },
        {
            value: 'buysell',
            label: 'Ost-müük'
        },
        {
            value: 'expat',
            label: 'Elu välismaal'
        },
        {
            value: 'misc',
            label: 'Vaba teema'
        },
    ]

    return (
        <div className={styles.ForumPostForm}>
            <div className={styles.FormContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.FormRadioGroup}>
                        {categories.map(category => {
                            return (
                                <div className={clsx(styles.RadioButton, {
                                    [styles.RadioButtonChecked]: categoryValue === category.value
                                })} key={category.value}>
                                    <FormRadioButton
                                        id={category.value}
                                        name={'category'}
                                        label={category.label}
                                        type={'radio'}
                                        value={category.value}
                                        checked={categoryValue === category.value}
                                        disabled={isSubmitting}
                                        register={register} />
                                </div>
                            )
                        })}
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
                            name={'body'}
                            control={control}
                            render={({ field, fieldState, formState }) => {
                                return (
                                    <FormRichTextEditor
                                        id={'body'}
                                        label={'Sisu'}
                                        value={''}
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

export default ForumPostForm