import styles from './ImageGalleryModal.module.scss'
import React, {SyntheticEvent, useEffect, useRef} from "react"
import clsx from "clsx"
import {Image as ImageType} from "../../../types"
import ImageGallerySlider from "../ImageGallerySlider"
import CloseIcon from "../../../icons/CloseIcon"

type Props = {
    show: boolean
    images: Array<ImageType>
    selectedImage: ImageType
    onHide: () => void
    onImageHide: (image: ImageType) => void
}

const ImageGalleryModal = ({show, images, selectedImage, onHide, onImageHide}: Props) => {
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
    }, [show, onHide])

    const onHideModal = (e: SyntheticEvent) => {
        e.stopPropagation()
        if ((e.target as HTMLDivElement).id === 'image-modal-container') {
            onHide()
        }
    }

    return (
        <div className={clsx(styles.Modal, {
            [styles.Show]: show
        })}>
            <div className={styles.ModalBackground} onClick={onHideModal}>
                <div className={styles.ModalContainer} id={'image-modal-container'}>
                    <div className={styles.ModalClose} onClick={onHide}>
                        <CloseIcon />
                    </div>
                    <div className={styles.ModalContent} ref={modalRef}>
                        {show && selectedImage !== undefined &&
                            <ImageGallerySlider
                                images={images}
                                selectedImage={selectedImage}
                                onImageHide={onImageHide}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

ImageGalleryModal.defaultProps = {
    show: false,
    onHide: undefined
}

export default ImageGalleryModal