import React from 'react'
import styles from './ForumPostForm.module.scss'
import clsx from 'clsx'
import FormInput from '../../Form/FormInput'
import SubmitButton from '../../Form/SubmitButton'
import { toast } from 'react-toastify'
import { getForumUrlByType, getForumUrlByTypeAndSlug, setFormErrors } from '../../../helpers'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormRadioButton from '../../Form/FormRadioButton'
import FormRichTextEditor from '../../Form/FormRichTextEditor'
import { Content, Destination, Topic } from '../../../types'
import FormMultiSelect from '../../Form/FormMultiSelect'
import { addPost, updatePost } from '../../../services/forum.service'
import { useRouter } from 'next/router'

type Inputs = {
    category: string
    title: string
    body: string
    destinations: { value: string; label: string }[]
    topics: { value: string; label: string }[]
}

type Props = {
    post?: Content
    destinations: Destination[]
    topics: Topic[]
}

const ForumPostForm = ({ post, destinations, topics }: Props) => {
    const router = useRouter()
    const forumPostSchema = yup
        .object()
        .shape({
            category: yup.string().required('Kategooria on kohustuslik'),
            title: yup.string().required('Pealkiri on kohustuslik'),
            body: yup.string().required('Sisu on kohustuslik'),
            destinations: yup.array().nullable(),
            topics: yup.array().nullable(),
        })
        .required()

    const {
        watch,
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: yupResolver(forumPostSchema),
        defaultValues: {
            category: post ? post.type : 'forum',
            title: post ? post.title : '',
            body: post ? post.body : '',
            destinations: post
                ? post.destinations?.map((d) => {
                      return { label: d.name, value: d.id.toString() }
                  })
                : [],
            topics: post
                ? post.topics?.map((d) => {
                      return { label: d.name, value: d.id.toString() }
                  })
                : [],
        },
    })

    const savePost = async (values: Inputs): Promise<any> => {
        const formData = {
            ...values,
            destinations: values.destinations.map((d) => parseInt(d.value)),
            topics: values.topics.map((t) => parseInt(t.value)),
        }

        if (post) {
            await updatePost(post, formData).then(res => {
                if (res.data.type === 'forum') {
                    router.push('/')
                } else {
                    const url = getForumUrlByTypeAndSlug(res.data.type, res.data.slug)
                    router.push(url)
                }
                toast.success('Postitus muudetud!')
            }).catch(e => {
                toast.success('Postituse muutmine ebaõnnestus!')
            })
        } else {
            await addPost(formData).then(res => {
                if (res.data.type === 'forum') {
                    router.push('/')
                } else {
                    const url = getForumUrlByType(res.data.type)
                    router.push(url)
                }
                toast.success('Uus postitus loodud!')
            }).catch(e => {
                toast.success('Postituse loomine ebaõnnestus!')
            })
        }
    }

    const categoryValue = watch('category')
    const onSubmit: SubmitHandler<Inputs> = async (values: Inputs) => {
        await savePost(values).catch((err) => {
            if (err.response?.data?.errors) {
                setFormErrors(err.response.data.errors, setError)
            }
            toast.error('Salvestamine ebaõnnestus!')
        })
    }

    const categories = [
        {
            value: 'forum',
            label: 'Üldfoorum',
        },
        {
            value: 'buysell',
            label: 'Ost-müük',
        },
        {
            value: 'expat',
            label: 'Elu välismaal',
        },
        {
            value: 'misc',
            label: 'Vaba teema',
        },
    ]

    const destinationOptions: { value: string; label: string }[] = destinations.map((destination) => ({
        label: destination.name,
        value: destination.id.toString(),
    }))
    const topicOptions: { value: string; label: string }[] = topics.map((topic) => ({
        label: topic.name,
        value: topic.id.toString(),
    }))
    return (
        <div className={styles.ForumPostForm}>
            <div className={styles.FormContainer}>
                <form>
                    <div className={styles.FormRadioGroup}>
                        {categories.map((category) => {
                            return (
                                <div
                                    className={clsx(styles.RadioButton, {
                                        [styles.RadioButtonChecked]: categoryValue === category.value,
                                    })}
                                    key={category.value}
                                >
                                    <FormRadioButton
                                        id={category.value}
                                        name={'category'}
                                        label={category.label}
                                        type={'radio'}
                                        value={category.value}
                                        error={errors.category?.message}
                                        disabled={isSubmitting}
                                        register={register}
                                    />
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
                            register={register}
                        />
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
                                        required={true}
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
                            name={'destinations'}
                            control={control}
                            render={({ field, fieldState, formState }) => {
                                return (
                                    <FormMultiSelect
                                        id={'destinations'}
                                        options={destinationOptions}
                                        label={'Sihtkohad'}
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
                                        label={'Valdkonnad'}
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
                            onClick={handleSubmit(onSubmit)}
                            type={'button'}
                            title={'Salvesta'}
                            submitting={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForumPostForm
