import styles from './ImageGallery.module.scss'
import {Fragment} from "react"
import {Image as ImageType} from "../../types"
import LightGallery from 'lightgallery/react'
import lgThumbnail from 'lightgallery/plugins/thumbnail'

type Props = {
    images: Array<ImageType>
}

const ImageGallery = ({images}: Props) => {
    return (
        <Fragment>
            <LightGallery
                speed={500}
                plugins={[lgThumbnail]}
                licenseKey={process.env.LIGHTGALLERY_KEY}
                download={false}
                elementClassNames={styles.ImageGallery}
            >
                {images.map(image => {
                    return (
                        <a href={image.urlLarge} key={image.id} className={styles.Image}>
                            <img alt={image.title} src={image.urlSmall} />
                        </a>
                    )
                })}
            </LightGallery>
        </Fragment>
    )
}

export default ImageGallery