import styles from "./LoadingSpinner.module.scss"
import clsx from "clsx"

// @ts-ignore
const LoadingSpinner = ({show}) => {
    return (
        <div className={clsx(styles.LoadingSpinner, {
            [styles.Show]: show
        })}>
            <span className={styles.Bounce1} />
            <span className={styles.Bounce2} />
            <span />
        </div>
    )
}

LoadingSpinner.defaultProps = {
    show: false
}

export default LoadingSpinner