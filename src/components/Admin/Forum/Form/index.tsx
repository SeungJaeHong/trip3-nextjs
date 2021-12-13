import React from "react"
import styles from "./AdminForumForm.module.scss"
import FormInput from "../../../Form/FormInput"
import SubmitButton from "../../../Form/SubmitButton"
import toast from 'react-hot-toast'
import {setFormErrors} from "../../../../helpers"
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import FormRichTextEditor from "../../../Form/FormRichTextEditor";
import {Content} from "../../../../types";
import {addPost, updatePost} from "../../../../services/admin.service"
import {useRouter} from 'next/router'

type Inputs = {
    title: string
    body: string
}

type Props = {
    post?: Content
}

const AdminForumForm = ({post}: Props) => {
    const router = useRouter()
    const forumPostSchema = yup.object().shape({
        title: yup.string().required('Pealkiri on kohustuslik'),
        body: yup.string().required('Sisu on kohustuslik'),
    }).required()

    const { register, handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm<Inputs>({
        resolver: yupResolver(forumPostSchema),
        defaultValues: {
            title: post ? post.title : '',
            body: post ? post.body : '',
        }
    })

    const savePost = async (values: Inputs): Promise<any> => {
        if (post) {
            return await updatePost(post, values).then(res => {
                router.push('/admin/forum/' + post.id)
                toast.success('Postitus muudetud!')
            })
        } else {
            return await addPost(values).then(res => {
                router.push('/admin/forum')
                toast.success('Uus postitus loodud!')
            })
        }
    }

    const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
        const resp = await savePost(values).catch(err => {
            if (err.response?.data?.errors) {
                setFormErrors(err.response.data.errors, setError)
            }
            toast.error('Salvestamine ebaõnnestus!')
        })
    }

    return (
        <div className={styles.AdminForumForm}>
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
                            name={'body'}
                            control={control}
                            render={({ field, fieldState, formState }) => {
                                return (
                                    <FormRichTextEditor
                                        id={'body'}
                                        label={'Sisu'}
                                        value={post ? post.body : ''}
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

export default AdminForumForm