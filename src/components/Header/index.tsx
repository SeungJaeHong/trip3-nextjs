import Navbar from '../Navbar'
import clsx from "clsx"
import containerStyle from "../../styles/containers.module.scss"
import styles from "./Header.module.scss"

type Props = {
    title?: string
    children?: JSX.Element | JSX.Element[]
}

const Header = (props: Props) => {
    return (
        <div className={styles.Header}
             style={{
                 backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(/images/header6.jpg)",
                 width: "100%",
                 backgroundRepeat: "no-repeat",
                 backgroundSize: "cover",
                 backgroundPosition: "50% 50%"
             }}>
            <div className={clsx([containerStyle.ContainerXl, styles.Container])}>
                <div className={styles.Navbar}>
                    <Navbar />
                </div>
                {props.title &&
                    <div className={styles.Title}>
                        {props.title}
                    </div>
                }

                {props.children}
            </div>
        </div>
    )
}

export default Header