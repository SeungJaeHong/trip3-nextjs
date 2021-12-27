import Image from 'next/image'
import styles from './ImageGallery.module.scss'
import {Fragment, useState} from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation} from 'swiper'
SwiperCore.use([Navigation])
import Modal from "../Modal"

type Props = {
    images: []
}

const ImageGallery = (props: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <Fragment>
            <div className={styles.ImageGallery}>
                <div className={styles.Image} onClick={() => setShowModal(true)}>
                    <Image
                        src={process.env.IMAGE_URL+ '/content/small/A0B87817-1D6E-45F5-8D8A-5FA6820F28A3_3q94.jpeg'}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image} onClick={() => setShowModal(true)}>
                    <Image
                        src={process.env.IMAGE_URL + "/content/small/2019-Austria-119_dqkk.jpeg"}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL + "/content/small/2019-Austria-021_ujvk.jpeg"}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL+ '/content/small/A0B87817-1D6E-45F5-8D8A-5FA6820F28A3_3q94.jpeg'}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL + "/content/small/2019-Austria-119_dqkk.jpeg"}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL + "/content/small/2019-Austria-021_ujvk.jpeg"}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL+ '/content/small/A0B87817-1D6E-45F5-8D8A-5FA6820F28A3_3q94.jpeg'}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL + "/content/small/2019-Austria-119_dqkk.jpeg"}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL + "/content/small/2019-Austria-021_ujvk.jpeg"}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL+ '/content/small/A0B87817-1D6E-45F5-8D8A-5FA6820F28A3_3q94.jpeg'}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL + "/content/small/2019-Austria-119_dqkk.jpeg"}
                        alt="Picture of the author"
                        width={220}
                        height={160}
                    />
                </div>
                <div className={styles.Image}>
                    <Image
                        src={process.env.IMAGE_URL + "/content/small/2019-Austria-021_ujvk.jpeg"}
                        alt="Picture of the author"
                        width={220}
                        height={150}
                    />
                </div>
                <div className={styles.MoreImages}>
                    <div className={styles.MoreTitle}>
                        +199
                    </div>
                </div>
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
                    >
                        <SwiperSlide>
                            <Image
                                src={process.env.IMAGE_URL + "/content/large/2019-Austria-021_ujvk.jpeg"}
                                alt="Picture of the author"
                                //width={700}
                               /* height={450}*/
                                layout={'fill'}
                                objectFit={'contain'}
                            />
                        </SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                    </Swiper>
                </div>
            </Modal>
        </Fragment>
    )
}

export default ImageGallery