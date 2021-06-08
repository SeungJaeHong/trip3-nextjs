import styles from "./BlockTitle.module.scss"
import Link from "next/link"

type Props = {
    title: string
    route: string
}

const BlockTitle = (props: Props) => {
    return (
        <div className={styles.BlockTitle}>
            <Link href={props.route}>
                <a className={styles.Title}>
                    {props.title}
                </a>
            </Link>
        </div>

    )
}

export default BlockTitle