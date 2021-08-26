import React, {useEffect, useState} from "react"
import {Field, Form, Formik, FormikProps} from 'formik'
import styles from "./LoginForm.module.scss"
import clsx from "clsx"
import {useAuth} from "../../context/AuthContext"
import Router from "next/router"
import FormInput from "../Form/FormInput"
import SubmitButton from "../Form/SubmitButton"

const LoginForm = () => {
    const [formInput, setFormInput] = useState({email: '', password: ''})
    const { user, login } = useAuth()

    const signIn = (e: any) => {
        e.preventDefault()

        if (formInput) {
            if (login(formInput.email, formInput.password)) {
                //todo: show success notifocation
            } else {
                console.log('invalid data')
            }
        } else {
            console.log('fill fields')
        }
    }

    const updateFormInput = (e: any) => {
        e.persist()
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
        if (user) {
            Router.replace("/");
        }
    }, [user]);

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
                        console.log(values)

                        setTimeout(() => {
                            //alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 2500);
                    }}
                >
                    {(props: FormikProps<any>) => (
                        <Form>
                            <div className={styles.FormInput}>
                                <Field
                                    name={'userName'}
                                    id={'userName'}
                                    label={'Kasutajanimi'}
                                    disabled={props.isSubmitting}
                                    component={FormInput} />
                            </div>
                            <div className={styles.FormInput}>
                                <Field
                                    name={'password'}
                                    id={'password'}
                                    label={'Parool'}
                                    type={'password'}
                                    disabled={props.isSubmitting}
                                    component={FormInput} />
                            </div>
                            <div className={styles.SubmitButton}>
                                <SubmitButton
                                    title={'Logi sisse'}
                                    submitting={props.isSubmitting} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginForm