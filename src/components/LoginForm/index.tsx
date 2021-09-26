import React, {useEffect} from "react"
import {Field, Form, Formik, FormikHelpers, FormikProps} from 'formik'
import styles from "./LoginForm.module.scss"
import clsx from "clsx"
import Router from "next/router"
import FormInput from "../Form/FormInput"
import SubmitButton from "../Form/SubmitButton"
import {useAppDispatch, useAppSelector} from "../../hooks"
import {selectUser, selectLoadingUser, selectErrorUser, setUser} from "../../redux/auth"
import toast from 'react-hot-toast'
import {setFormikErrors} from "../../helpers";
import {login} from "../../services/auth.service";

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const loadingUser = useAppSelector(selectLoadingUser)
    const errorUser = useAppSelector(selectErrorUser)

    useEffect(() => {
        if (user && user.id) {
            Router.replace('/')
        }
    }, [user])

    const handleLogin = async (values: any, formikHelpers: FormikHelpers<any>) => {
        const { name, password } = values
        const resp = await login(name, password).then(res => {
            dispatch(setUser(res.data))
            toast.success('Sisselogimine õnnestus!')
        }).catch(err => {
            //console.log(err.response.data.errors, 'ERROR')
            if (err.response?.data?.errors) {
                setFormikErrors(err.response.data.errors, formikHelpers.setFieldError)
            }
            toast.error('Sisselogimine ebaõnnestus!')
        })
    }

    return (
        <div className={styles.LoginForm}>
            <div className={styles.Tabs}>
                <div className={clsx(styles.Tab, styles.UserName)}>
                    Kasutajanimi
                </div>
                <div className={clsx(styles.Tab, styles.Social, styles.Facebook)}>
                    Facebook
                </div>
                <div className={clsx(styles.Tab, styles.Social, styles.Google)}>
                    Google
                </div>
            </div>
            <div className={styles.FormContainer}>
                <Formik
                    initialValues={{ name: '', password: '' }}
                    onSubmit={handleLogin}
                >
                    {({ values, handleChange, handleBlur, errors, touched }: FormikProps<any>) => (
                        <Form>
                            <div className={styles.FormInput}>
                                <Field
                                    name={'name'}
                                    id={'name'}
                                    label={'Kasutajanimi'}
                                    disabled={loadingUser}
                                    hasError={errors?.name?.length}
                                    component={FormInput} />
                            </div>
                            <div className={styles.FormInput}>
                                <Field
                                    name={'password'}
                                    id={'password'}
                                    label={'Parool'}
                                    type={'password'}
                                    disabled={loadingUser}
                                    hasError={errors?.password?.length}
                                    component={FormInput} />
                            </div>
                            <div className={styles.SubmitButton}>
                                <SubmitButton
                                    title={'Logi sisse'}
                                    submitting={loadingUser} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginForm