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
    const modalRef = useRef(null)
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.code === 'Escape')
                onHide()
        }

        if (show) {
            window.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset';
        }
    }, [show, onHide])

    const onHideModal = (e: SyntheticEvent) => {
        e.stopPropagation();
        if ((e.target as HTMLDivElement).id === 'modal-container') {
            onHide();
        }
    }

    return (
        <div className={clsx(styles.Modal, {
            ['modal-visible']: show,
            [className]: true
        })}>
            <div className={'modal-background'} onClick={onHideModal}>
                <div className={'modal-container'} id={'modal-container'}>
                    <div className={'modal-content'} ref={modalRef}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    show: false,
    className: undefined,
}

export default Modal