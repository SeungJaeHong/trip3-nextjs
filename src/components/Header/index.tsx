import Navbar from '../Navbar'
import clsx from "clsx"
import containerStyle from "../../styles/containers.module.scss"
import styles from "./Header.module.scss"
import BackgroundMap from "../BackgroundMap"
import {CSSProperties} from "react"

type Props = {
    title?: string
    children?: JSX.Element | JSX.Element[]
    backgroundImage?: string | null
    withBackgroundMap?: boolean
    className?: string
    style?: CSSProperties
}

const Header = (props: Props) => {
    let style = undefined
    if (props.backgroundImage && !props.withBackgroundMap) {
        style = {
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + props.backgroundImage + ")",
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "50% 60%"
        }
    }

    return (
        <div className={clsx(styles.Header, props.className, {
            [styles.Light]: props.withBackgroundMap
        })} style={{...style, ...props.style}}>
            <div className={clsx([containerStyle.ContainerXl, styles.Container])}>
                <div className={styles.Navbar}>
                    <Navbar darkMode={props.withBackgroundMap} />
                </div>
                {props.title &&
                    <div className={styles.Title}>
                        {props.title}
                    </div>
                }

                {props.withBackgroundMap && <BackgroundMap />}

                {props.children}
            </div>
        </div>
    )
}

Header.defaultProps = {
    backgroundImage: '/images/header_winter.webp',
    withBackgroundMap: false,
    light: false
}

export default Header