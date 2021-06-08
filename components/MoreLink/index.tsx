import styles from "./MoreLink.module.scss"
import Link from "next/link"
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import clsx from "clsx";

type Props = {
    title: string
    route: string
    large: boolean
}

const MoreLink = (props: Props) => {
    return (
        <Link href={props.route}>
            <a className={clsx(styles.MoreLink, {
                [styles.Large]: props.large
            })}>
                <span className={styles.Title}>{props.title}</span>
                <span className={styles.Icon}>
                    <ArrowRightIcon />
                </span>
            </a>
        </Link>
    )
}

MoreLink.defaultProps = {
    large: false
}

export default MoreLink