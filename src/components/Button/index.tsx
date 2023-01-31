import styles from "./Button.module.scss"
import Link from "next/link"
import {MouseEventHandler} from "react"
import clsx from "clsx"

type Props = {
    title: string
    route?: string
    onClick?: MouseEventHandler<HTMLElement> | undefined
    light?: boolean
    cancel?: boolean
    className: string
}

const Button = (props: Props) => {
    if (props.route) {
        return (
            <Link href={props.route}>
                <a className={clsx(styles.Button, {
                    [styles.Light]: props.light,
                    [styles.Cancel]: props.cancel,
                    [props.className]: true
                })}>
                    <span className={styles.Title}>{props.title}</span>
                </a>
            </Link>
        )
    } else {
        return (
            <button className={clsx(styles.Button, {
                [styles.Light]: props.light,
                [styles.Cancel]: props.cancel,
                [props.className]: true
            })} onClick={props.onClick ?? undefined} type={'button'}>
                <span className={styles.Title}>{props.title}</span>
            </button>
        )
    }
}

Button.defaultProps = {
    light: false,
    cancel: false,
    className: undefined
}

export default Button