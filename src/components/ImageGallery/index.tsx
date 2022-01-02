import styles from './ImageGallery.module.scss'
import {Fragment, useCallback, useEffect, useState} from "react"
import {Image as ImageType} from "../../types"
import LightGallery from 'lightgallery/react'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import {useRouter} from "next/router"
import useUser from "../../hooks"
import ReactDOM from 'react-dom'

type Props = {
    images: Array<ImageType>
    hideImage: (contentId: number) => void
}

const ImageGallery = ({images, hideImage}: Props) => {
    //const router = useRouter()
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [galleryInstance, setGalleryInstance] = useState<any>(undefined)

    const onClickHideImage = () => {
        const imageIndex = galleryInstance.index
        const photoId = galleryInstance.galleryItems[imageIndex].contentId
        hideImage(photoId)
        let galleryItems = [...galleryInstance.galleryItems]
        galleryItems.splice(imageIndex, 1)
        galleryInstance.updateSlides(galleryItems, imageIndex >= galleryItems.length ? 1 : imageIndex + 1)
        galleryInstance.refresh(galleryItems)
        galleryInstance.destroyModules()
    }

    const renderHideButton = () => {
        if (galleryInstance) {
            const element = (
                <button type={'button'} onClick={() => onClickHideImage()}>Peida</button>
            )

            if (document.getElementById('lg-hide-photo')) {
                ReactDOM.render(element, document.getElementById('lg-hide-photo'))
            }
        }
    }

    const onInit = useCallback((detail) => {
        const { instance } = detail
        setGalleryInstance(instance)
        if (userIsAdmin) {
            const hideBtn = '<div id="lg-hide-photo" class="HideImageButtonContainer">Peida</div>'
            instance.outer.find('.lg-toolbar').append(hideBtn)
            renderHideButton()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        renderHideButton()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images, galleryInstance])

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