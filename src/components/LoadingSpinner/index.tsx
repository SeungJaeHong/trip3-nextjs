import styles from "./LoadingSpinner.module.scss"

const LoadingSpinner = () => {
    return (
        <div className={styles.LoadingSpinner}>
            <div className={styles.Spinner} />
        </div>
    )
}

export default LoadingSpinner