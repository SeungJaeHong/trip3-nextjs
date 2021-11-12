import styles from "./Alert.module.scss"
import clsx from "clsx"
import WarningIcon from "../../icons/WarningIcon"
import ErrorIcon from "../../icons/ErrorIcon"
import InfoIcon from "../../icons/InfoIcon"

type Props = {
    title: string
    type: 'warning' | 'error' | 'info'
}

const Alert = ({title, type}: Props) => {
    const renderIcon = () => {
        switch (type) {
            case 'warning':
                return <WarningIcon />
            case 'info':
                return <InfoIcon />
            default:
                return <ErrorIcon />
        }
    }

    return (
        <div className={clsx(styles.Alert, {
            [styles.Warning]: type === 'warning',
            [styles.Info]: type === 'info'
        })}>
            {renderIcon()}
            <span className={styles.Title}>{title}</span>
        </div>
    )
}

Alert.defaultProps = {
    type: 'error'
}

export default Alert