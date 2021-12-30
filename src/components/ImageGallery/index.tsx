import styles from './ImageGallery.module.scss'
import {Fragment, useCallback} from "react"
import {Image as ImageType} from "../../types"
import LightGallery from 'lightgallery/react'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import {useRouter} from "next/router"
import useUser from "../../hooks"

type Props = {
    images: Array<ImageType>
    hideImage: (contentId: number) => void
}

const ImageGallery = ({images, hideImage}: Props) => {
    //const router = useRouter()
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin

    const onInit = useCallback((detail) => {
        const { instance } = detail
        if (userIsAdmin) {
            const hideBtn = '<button type="button" aria-label="Peida" class="HideImageButton" id="lg-hide-photo">Peida</button>'
            instance.outer.find('.lg-toolbar').append(hideBtn)
            instance.outer.find('#lg-hide-photo').on('click', () => {
                const imageIndex = instance.index
                const photoId =  instance.galleryItems[imageIndex].contentId
                hideImage(photoId)
                let galleryItems = [...instance.galleryItems]
                galleryItems.splice(imageIndex, 1)
                instance.updateSlides(galleryItems, imageIndex >= galleryItems.length ? 1 : imageIndex + 1)
                instance.refresh(galleryItems)
                instance.destroyModules()
            })
        }
    }, [])

    if (images.length === 0) {
        return null
    }

    return (
        <Fragment>
            <LightGallery
                speed={500}
                plugins={[lgThumbnail]}
                licenseKey={process.env.LIGHTGALLERY_KEY}
                download={false}
                elementClassNames={styles.ImageGallery}
                addClass={styles.ImageGalleryWrapper}
                extraProps={['contentId']}
                onInit={onInit}
            >
                {images.map(image => {
                    return (
                        <a href={image.urlLarge} className={styles.Image} data-sub-html={'#caption_' + image.id} data-content-id={image.id} key={image.id}>
                            <img alt={image.title} src={image.urlSmall} id={'photo_' + image.id} />
                        </a>
                    )
                })}
            </LightGallery>

            {images.map(image => {
                return (
                    <div id={'caption_' + image.id} style={{display:'none'}} key={'caption_' + image.id}>
                        <h4>
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