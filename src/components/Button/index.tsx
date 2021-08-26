import styles from "./Button.module.scss"
import Link from "next/link"
import {MouseEventHandler} from "react"
import clsx from "clsx"

type Props = {
    title: string
    route?: string
    onClick?: MouseEventHandler<HTMLElement> | undefined
    light?: boolean
}

const Button = (props: Props) => {
    if (props.route) {
        return (
            <Link href={props.route}>
                <a className={clsx(styles.Button, {
                    [styles.Light]: props.light
                })}>
                    <span className={styles.Title}>{props.title}</span>
                </a>
            </Link>
        )
    } else {
        return (
            <button className={clsx(styles.Button, {
                [styles.Light]: props.light
            })} onClick={props.onClick ?? undefined}>
                <span className={styles.Title}>{props.title}</span>
            </button>
        )
    }
}

Button.defaultProps = {
    light: false
}

export default Button