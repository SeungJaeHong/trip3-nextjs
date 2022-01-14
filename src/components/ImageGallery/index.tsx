import styles from './ImageGallery.module.scss'
import {useState} from "react"
import {Image as ImageType} from "../../types"
import ImageGalleryModal from "./ImageGalleryModal"

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

    if (images.length === 0) {
        return null
    }

    return (
        <>
            <div className={styles.ImageGallery}>
                {images.map(image => {
                    return (
                        <div className={styles.Image} key={image.id} onClick={() => openGallery(image)}>
                            <img alt={image.title} src={image.urlSmall} />
                        </div>
                    )
                })}
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