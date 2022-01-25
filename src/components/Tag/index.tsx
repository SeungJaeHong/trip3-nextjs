import styles from "./Tag.module.scss"
import Link from "next/link"
import {MouseEventHandler} from "react"
import clsx from "clsx"

type Props = {
    title: string
    type?: 'destination'
    large: boolean
    route?: string
    white?: boolean
    red?: boolean
    onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const Tag = (props: Props) => {
    if (props.route) {
        return (
            <Link href={props.route}>
                <a className={clsx(styles.Tag, {
                    [styles.Destination]: props.type === 'destination',
                    [styles.Large]: props.large,
                    [styles.White]: props.white,
                    [styles.Red]: props.red
                })}>
                    <span className={styles.Title}>{props.title}</span>
                </a>
            </Link>
        )
    } else {
        return (
            <div className={clsx(styles.Tag, {
                [styles.Destination]: props.type === 'destination',
                [styles.Large]: props.large,
                [styles.White]: props.white,
                [styles.Red]: props.red
            })} onClick={props.onClick ?? undefined}>
                <span className={styles.Title}>{props.title}</span>
            </div>
        )
    }
}

Tag.defaultProps = {
    large: false,
    white: false,
    red: false
}

export default Tag