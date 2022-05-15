import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './ErrorPage.module.scss'
import containerStyle from '../styles/containers.module.scss'

export default function ErrorPage503() {
    return (
        <div className={styles.Container}>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.Navbar}>
                    <Navbar darkMode={true} />
                </div>
                <div className={containerStyle.ContainerLg}>
                    <div className={styles.Content}>
                        <h2>Uuendame...</h2>
                        <p>
                            Uunedame trippi
                        </p>
                        <p>
                            Proovi mõne aja pärast uuesti.
                        </p>
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </div>
    )
}
