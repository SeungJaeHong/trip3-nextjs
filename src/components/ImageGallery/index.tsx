import Image from 'next/image'
import styles from './ImageGallery.module.scss'
import {useEffect} from "react"
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {
    images: []
}

const ImageGallery = (props: Props) => {

    useEffect(() => {

    }, [])

    return (
        <div className={styles.ImageGallery}>
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
        </div>
    )
}

export default ImageGallery