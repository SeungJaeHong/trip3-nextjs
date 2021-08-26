import React, {useEffect, useState} from "react"
import styles from "./LoginForm.module.scss"
import clsx from "clsx"
import {useAuth} from "../../context/AuthContext"
import Router from "next/router"
import FormInput from "../Form/FormInput"
import Button from "../Button"

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
                <form>
                    <div className={styles.FormInput}>
                        <FormInput name={'username'} label={'Kasutajanimi'} />
                    </div>
                    <div className={styles.FormInput}>
                        <FormInput name={'password'} label={'Parool'} type={'password'} />
                    </div>
                    <div className={styles.SubmitButton}>
                        <Button title={'Logi sisse'} onClick={signIn} />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm