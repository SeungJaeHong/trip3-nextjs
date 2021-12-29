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
                addClass={styles.ImageGalleryWrapper}
            >
                {images.map(image => {
                    return (
                        <a href={image.urlLarge} key={image.id} className={styles.Image} data-sub-html={'#caption_' + image.id}>
                            <img alt={image.title} src={image.urlSmall} />
                        </a>
                    )
                })}
            </LightGallery>

            {images.map(image => {
                return (
                    <div id={'caption_' + image.id} style={{display:'none'}} key={'caption_' + image.id}>
                        <h4 onClick={() => alert('jep')}>
                            {image.title}
                        </h4>
                        {image?.user !== undefined &&
                            <a href={'/user/' + image.user.id} className={styles.UserContainer}>
                                {image.user.avatar &&
                                    <div className={styles.UserAvatar}>
                                        <img alt={image.user.name} src={image.user.avatar} />
                                    </div>
                                }
                                <div className={styles.UserName}>{image.user.name}</div>
                            </a>
                        }
                    </div>
                )
            })}
        </Fragment>
    )
}

export default ImageGallery