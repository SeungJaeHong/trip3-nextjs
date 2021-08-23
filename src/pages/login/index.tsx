import React, {Fragment, useEffect, useState} from "react"
import Router from "next/router";
import { useAuth } from "../../context/AuthContext"
import Navbar from "../../components/Navbar"
import styles from './Login.module.scss'
import clsx from "clsx";
import Footer from "../../components/Footer"
import containerStyle from "../../styles/containers.module.scss"
import BackgroundMap from "../../components/BackgroundMap";
import Link from "next/link";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>
                        Logi sisse
                    </div>
                    <div className={styles.RegisterTitle}>
                        Pole veel kasutaja?
                        <Link href={'/register'}>
                            <a>Registreeri siin</a>
                        </Link>
                    </div>
                    <div className={styles.Form}>
                        <LoginForm />
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default LoginPage