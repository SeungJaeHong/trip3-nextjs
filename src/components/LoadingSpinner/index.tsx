import styles from "./LoadingSpinner.module.scss"
import clsx from "clsx"

// @ts-ignore
const LoadingSpinner = ({show}) => {
    return (
        <div className={clsx(styles.LoadingSpinner, {
            [styles.Show]: show
        })}>
            <div className={styles.Spinner} />
        </div>
    )
}

LoadingSpinner.defaultProps = {
    show: false
}

export default LoadingSpinner