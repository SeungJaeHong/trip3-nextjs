import styles from './ImageGallery.module.scss'
import React, {useState} from "react"
import {Image as ImageType} from "../../types"
import ImageGalleryModal from "./ImageGalleryModal"
import Image from 'next/image'
import ArrowLeft2Icon from "../../icons/ArrowLeft2Icon"
import clsx from "clsx"
import ArrowRight2Icon from "../../icons/ArrowRight2Icon"

type Props = {
    images: Array<ImageType>
    hideImage: (image: ImageType) => void
}

const ImageGallery = ({images, hideImage}: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<ImageType | undefined>(undefined)

    const openGallery = (image: ImageType) => {
        setSelectedImage(image)
        setShowModal(true)
    }

    const scrollRight = () => {
        // @ts-ignore
        document.getElementById('image-gallery-container').scrollLeft += 300;
    }

    const scrollLeft = () => {
        // @ts-ignore
        document.getElementById('image-gallery-container').scrollLeft -= 300;
    }

    if (images.length === 0) {
        return null
    }

    return (
        <>
            <div className={styles.ImageGallery}>
                <div className={styles.Wrapper} id={'image-gallery-container'}>
                    {images.map(image => {
                        return (
                            <div className={styles.Image} key={image.id} onClick={() => openGallery(image)}>
                                <Image
                                    src={image.urlSmall}
                                    alt={image.title}
                                    layout={'fill'}
                                    objectFit={'cover'} />
                            </div>
                        )
                    })}
                </div>
                <div className={clsx(styles.Arrow, styles.ArrowLeft)} onClick={scrollLeft}>
                    <ArrowLeft2Icon />
                </div>
                <div className={styles.Arrow} onClick={scrollRight}>
                    <ArrowRight2Icon />
                </div>
            </div>

            {selectedImage !== undefined &&
                <ImageGalleryModal
                    show={showModal}
                    images={images}
                    selectedImage={selectedImage}
                    onHide={() => setShowModal(false)}
                    onImageHide={hideImage} />
            }
        </>
    )
}

export default ImageGallery