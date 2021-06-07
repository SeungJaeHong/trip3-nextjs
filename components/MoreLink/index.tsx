import styles from "./MoreLink.module.scss"
import Link from "next/link"
import ArrowRightIcon from "../../icons/ArrowRightIcon";

type Props = {
    title: string
    route: string
}

const MoreLink = (props: Props) => {
    return (
        <Link href={props.route}>
            <a className={styles.MoreLink}>
                <span className={styles.Title}>{props.title}</span>
                <span className={styles.Icon}>
                    <ArrowRightIcon />
                </span>
            </a>
        </Link>
    )
}

export default MoreLink