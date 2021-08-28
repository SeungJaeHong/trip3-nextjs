import React, {useEffect} from "react"
import {Field, Form, Formik, FormikProps} from 'formik'
import styles from "./LoginForm.module.scss"
import clsx from "clsx"
import Router from "next/router"
import FormInput from "../Form/FormInput"
import SubmitButton from "../Form/SubmitButton"
import {useAppDispatch, useAppSelector} from "../../hooks"
import {login, selectUser, selectLoadingUser} from "../../redux/auth"

const LoginForm = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const loadingUser = useAppSelector(selectLoadingUser)

    useEffect(() => {
        if (user && user.id) {
            Router.replace("/")
        }
    }, [user])

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
                    initialValues={{ userName: '', password: '' }}
                    onSubmit={(values, actions) => {
                        dispatch(login(values))
                    }}
                >
                    {(props: FormikProps<any>) => (
                        <Form>
                            <div className={styles.FormInput}>
                                <Field
                                    name={'userName'}
                                    id={'userName'}
                                    label={'Kasutajanimi'}
                                    disabled={loadingUser}
                                    component={FormInput} />
                            </div>
                            <div className={styles.FormInput}>
                                <Field
                                    name={'password'}
                                    id={'password'}
                                    label={'Parool'}
                                    type={'password'}
                                    disabled={loadingUser}
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