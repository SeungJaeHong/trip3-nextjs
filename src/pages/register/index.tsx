import React, {Fragment} from "react"
import Navbar from "../../components/Navbar"
import styles from './Register.module.scss'
import clsx from "clsx";
import Footer from "../../components/Footer"
import containerStyle from "../../styles/containers.module.scss"
import BackgroundMap from "../../components/BackgroundMap";
import RegisterForm from "../../components/RegisterForm";

const RegisterPage = () => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>
                        Registreeri
                    </div>
                    <div className={styles.RegisterTitle}>
                        Liitu Trip.ee reisihuviliste seltskonnaga
                    </div>
                    <div className={styles.Form}>
                        <RegisterForm />
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export default RegisterPage