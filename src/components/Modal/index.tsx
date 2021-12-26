import styles from './Modal.module.scss'
import React, {SyntheticEvent, useEffect, useRef} from "react"
import clsx from "clsx"

type Props = {
    show: boolean
    className: string
    children: JSX.Element
    onHide: () => void
}

const Modal = ({show, className, children, onHide}: Props) => {

    if (!show) {
        return null
    }

    const modalRef = useRef(null)

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.code === 'Escape')
                onHide()
        }

        if (show) {
            window.addEventListener('keydown', handleEsc)
        }

        return () => {
            window.removeEventListener('keydown', handleEsc)
        }
    }, [show])

    const onHideModal = (e: SyntheticEvent) => {
        e.stopPropagation();
        console.log(modalRef.current, e.target)
    }

    return (
        <div className={clsx(styles.Modal, {
            [styles.Show]: show,
            [className]: true
        })}>
            <div className={styles.Background} />
            <div className={styles.Container} onClick={onHideModal}>
                <div className={styles.Content} ref={modalRef}>
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