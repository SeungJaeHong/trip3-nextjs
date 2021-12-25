import styles from './Modal.module.scss'
import React, {useEffect} from "react"
import clsx from "clsx"

type Props = {
    show: boolean
    className: string
    children: JSX.Element
    onHide: () => void
}

const Modal = ({show, className, children, onHide}: Props) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === '27')
                onHide();
        }

        if (show) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        }
    }, [show])

    return (
        <div className={clsx(styles.Modal, {
            [styles.Show]: show,
            [className]: true
        })}>
            <div className={styles.Background} />
            <div className={styles.Container} onClick={onHide}>
                <div className={styles.Content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    show: false,
    className: undefined,
    onHide: null
}

export default Modal