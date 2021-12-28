import Image from 'next/image'
import styles from './ImageGallery.module.scss'
import {Fragment, useState} from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation} from 'swiper'
SwiperCore.use([Navigation])
import Modal from "../Modal"
import {Image as ImageType} from "../../types"

type Props = {
    images: Array<ImageType>
}

const ImageGallery = ({images}: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    return (
        <Fragment>
            <div className={styles.ImageGallery}>
                {images.map(image => {
                    return (
                        <div className={styles.Image} onClick={() => setShowModal(true)} key={image.id}>
                            <Image
                                src={image.urlSmall}
                                alt={image.title}
                                layout={'fill'}
                                objectFit={'cover'}
                            />
                        </div>
                    )
                })}
                {/*<div className={styles.MoreImages}>
                    <div className={styles.MoreTitle}>
                        +199
                    </div>
                </div>*/}
            </div>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className={styles.ImageGalleryModal}>
                <div className={styles.ModalImagesContainer}>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={'auto'}
                        navigation={true}
                        keyboard={true}
                    >
                        {images.map(image => {
                            return (
                                <SwiperSlide key={image.id}>
                                    <Image
                                        src={image.urlLarge}
                                        alt={image.title}
                                        layout={'fill'}
                                        objectFit={'cover'}
                                    />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </Modal>
        </Fragment>
    )
}

export default ImageGallery