import styles from "./Tag.module.scss"
import Link from "next/link"
import {MouseEventHandler} from "react"
import clsx from "clsx";

type Props = {
    title: string
    type?: string
    route?: string
    onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

const Tag = (props: Props) => {
    if (props.route) {
        return (
            <Link href={props.route}>
                <a className={clsx(styles.Tag, {
                    [styles.Destination]: props.type === 'destination'
                })}>
                    <span className={styles.Title}>{props.title}</span>
                </a>
            </Link>
        )
    } else {
        return (
            <div className={clsx(styles.Tag, {
                [styles.Destination]: props.type === 'destination'
            })} onClick={props.onClick ?? undefined}>
                <span className={styles.Title}>{props.title}</span>
            </div>
        )
    }
}

export default Tag