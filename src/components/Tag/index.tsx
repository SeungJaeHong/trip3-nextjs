import styles from "./Tag.module.scss"
import Link from "next/link"
import {MouseEventHandler} from "react"
import clsx from "clsx"

type Props = {
    title: string
    type?: string
    large?: boolean
    route?: string
    white?: boolean
    onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const Tag = (props: Props) => {
    if (props.route) {
        return (
            <Link href={props.route}>
                <a className={clsx(styles.Tag, {
                    [styles.Destination]: props.type === 'destination',
                    [styles.Large]: props.large,
                    [styles.White]: props.white
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
                [styles.White]: props.white
            })} onClick={props.onClick ?? undefined}>
                <span className={styles.Title}>{props.title}</span>
            </div>
        )
    }
}

Tag.defaultProps = {
    large: false,
    white: false
}

export default Tag