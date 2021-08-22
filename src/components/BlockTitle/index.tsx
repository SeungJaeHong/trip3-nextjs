import styles from "./BlockTitle.module.scss"
import clsx from "clsx"

type Props = {
    title: string,
    className: string
}

const BlockTitle = (props: Props) => {
    return (
        <div className={clsx(styles.BlockTitle, {
            [props.className]: true
        })}>
            {props.title}
        </div>

    )
}

BlockTitle.defaultProps = {
    className: ''
}

export default BlockTitle