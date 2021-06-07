import styles from "./BlockTitle.module.scss"
import Link from "next/link"
//import ArrowRightIcon from "../../icons/ArrowRightIcon"

type Props = {
    title: string
    route: string
}

const BlockTitle = (props: Props) => {
    return (
        <Link href={props.route}>
            <a className={styles.BlockTitle}>
                <span className={styles.Title}>{props.title}</span>
                {/*<span className={styles.Icon}>
                    <ArrowRightIcon />
                </span>*/}
            </a>
        </Link>
    )
}

export default BlockTitle