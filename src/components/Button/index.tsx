import styles from "./Button.module.scss"
import Link from "next/link"
import {MouseEventHandler} from "react";

type Props = {
    title: string
    route?: string
    onClick?: MouseEventHandler<HTMLDivElement> | undefined
    classes?: string
}

const Button = (props: Props) => {
    if (props.route) {
        return (
            <Link href={props.route}>
                <a className={styles.Button}>
                    <span className={styles.Title}>{props.title}</span>
                </a>
            </Link>
        )
    } else {
        return (
            <div className={styles.Button} onClick={props.onClick ?? undefined}>
                <span className={styles.Title}>{props.title}</span>
            </div>
        )
    }
}

export default Button