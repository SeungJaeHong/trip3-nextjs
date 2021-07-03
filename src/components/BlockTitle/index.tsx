import styles from "./BlockTitle.module.scss"

type Props = {
    title: string
    route?: string //todo: remove after
}

const BlockTitle = (props: Props) => {
    return (
        <div className={styles.BlockTitle}>
            <span className={styles.Title}>
                {props.title}
            </span>
        </div>

    )
}

export default BlockTitle