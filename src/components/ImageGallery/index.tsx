import Image from 'next/image'
import styles from './ImageGallery.module.scss'

type Props = {
    images: []
}

const ImageGallery = (props: Props) => {
    return (
        <div className={styles.ImageGallery}>
            <div className={styles.Image}>
                <Image
                    src="https://trip.ee/images/large/A0B87817-1D6E-45F5-8D8A-5FA6820F28A3_3q94.jpeg"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
            <div className={styles.Image}>
                <Image
                    src="https://trip.ee/images/small_square/2019-Austria-119_dqkk.jpeg"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
            <div className={styles.Image}>
                <Image
                    src="https://trip.ee/images/large/2019-Austria-021_ujvk.jpeg"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
            <div className={styles.Image}>
                <Image
                    src="https://trip.ee/images/large/A0B87817-1D6E-45F5-8D8A-5FA6820F28A3_3q94.jpeg"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
            <div className={styles.Image}>
                <Image
                    src="https://trip.ee/images/small_square/2019-Austria-119_dqkk.jpeg"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
            <div className={styles.Image}>
                <Image
                    src="https://trip.ee/images/large/2019-Austria-021_ujvk.jpeg"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
            <div className={styles.Image}>
                <Image
                    src="https://trip.ee/images/large/A0B87817-1D6E-45F5-8D8A-5FA6820F28A3_3q94.jpeg"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
            <div className={styles.Image}>
                <Image
                    src="https://trip.ee/images/small_square/2019-Austria-119_dqkk.jpeg"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
            <div className={styles.Image}>
                <Image
                    src="https://trip.ee/images/large/2019-Austria-021_ujvk.jpeg"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
        </div>
    )
}

export default ImageGallery