import React, {useEffect, useState} from "react";
import styles from "./LoginForm.module.scss"
import clsx from "clsx"
import {useAuth} from "../../context/AuthContext";
import Router from "next/router";

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
                <div className={styles.Tab}>
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
                    <div>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            onChange={updateFormInput}
                            id="email" name="email" type="text" placeholder="Email" autoComplete={'off'} />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={updateFormInput}
                            id="password" name="password" type="password" autoComplete={'off'} />
                    </div>
                    <div>
                        <button
                            onClick={signIn}
                            type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LoginForm