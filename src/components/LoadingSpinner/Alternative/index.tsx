import styles from "./LoadingSpinnerAlt.module.scss"

const LoadingSpinnerAlt = () => {
    return (
        <div className={styles.LoadingSpinnerAlt}>
            <div className={styles.Spinner} />
        </div>
    )
}

export default LoadingSpinnerAlt