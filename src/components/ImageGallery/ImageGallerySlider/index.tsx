import React, {useEffect, useState} from "react"
import {Image as ImageType} from "../../../types"
import {useKeenSlider} from 'keen-slider/react'
import styles from './ImageGallerySlider.module.scss'
import Image from 'next/image'
import clsx from "clsx"
import UserAvatar from "../../User/UserAvatar"
import {useRouter} from "next/router"
import { useUser } from "../../../hooks"
import Tag from "../../Tag"

type Props = {
    images: Array<ImageType>
    selectedImage: ImageType
    onImageHide: (image: ImageType) => void
}

type ArrowProps = {
    onClick: (e: any) => void
    disabled: boolean
    isLeft: boolean
}

const ImageGallerySlider = ({images, selectedImage, onImageHide}: Props) => {
    const router = useRouter()
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [imageItems, setImagesItems] = useState<ImageType[]>(images)

    const getImageByIndex = (imageIndex: number) => {
        return imageItems.find((image, index) => imageIndex === index)
    }

    const getIndexByImage = (selectedImage: ImageType) => {
        return imageItems.findIndex((image) => selectedImage.id === image.id)
    }

    const selectedImageIndex = getIndexByImage(selectedImage)
    const [loaded, setLoaded] = useState<boolean>(false)
    // @ts-ignore
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(selectedImageIndex)
    const [currentSlideImage, setCurrentSlideImage] = useState<ImageType>(selectedImage)

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: currentSlideIndex,
        slideChanged(slider) {
            const index = slider.track.details.rel
            const image = getImageByIndex(index)
            // @ts-ignore
            setCurrentSlideImage(image)
            setCurrentSlideIndex(index)
        },
        created(slider) {
            setLoaded(true)
        },
    })

    useEffect(() => {
        if (loaded) {
            window.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded])

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'ArrowRight') {
            instanceRef.current?.next()
        } else if (event.code === 'ArrowLeft') {
            instanceRef.current?.prev()
        }
    }

    const onHideImage = () => {
        onImageHide(currentSlideImage)
        const newImages = imageItems.filter((item, i) => i !== currentSlideIndex)
        setImagesItems(newImages)

        const newIndex = newImages.length <= currentSlideIndex ? 0 : currentSlideIndex
        if (newIndex !== currentSlideIndex) {
            setCurrentSlideIndex(newIndex)
        }

        const activeImage = newImages.find((image, index) => newIndex === index)
        if (activeImage) {
            setCurrentSlideImage(activeImage)
        }
    }

    const Arrow = ({onClick, disabled, isLeft}: ArrowProps) => {
        return (
            <div className={clsx(styles.Arrow, {
                [styles.ArrowDisabled]: disabled,
                [styles.Right]: !isLeft,
            })} onClick={onClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {isLeft && (
                        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
                    )}
                    {!isLeft && (
                        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
                    )}
                </svg>
            </div>
        )
    }

    const renderNavigation = (isLeft: boolean) => {
        if (loaded && instanceRef.current) {
            if (isLeft) {
                return (
                    <Arrow
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                        disabled={currentSlideIndex === 0}
                        isLeft={true}
                    />
                )
            } else {
                return (
                    <Arrow
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                        disabled={currentSlideIndex === instanceRef.current.track.details.slides.length - 1}
                        isLeft={false}
                    />
                )
            }
        } else {
            return null
        }
    }

    const renderDestinations = () => {
        if (currentSlideImage.destinations && currentSlideImage.destinations?.length > 0) {
            return (
                <div className={styles.Destinations}>
                    {currentSlideImage.destinations?.map(destination => {
                        return <Tag
                            title={destination.name}
                            type={'destination'}
                            key={destination.id}
                            route={'/sihtkoht/' + destination.slug}
                            large={true} />
                    })}
                </div>
            )
        }

        return null
    }

    return (
        <>
            {instanceRef.current !== undefined &&
                <div className={styles.ImageCount}>
                    <div className={styles.Count}>
                        {/*@ts-ignore*/}
                        {currentSlideIndex + 1} / {imageItems.length}
                    </div>
                </div>
            }
            {userIsAdmin && instanceRef.current !== undefined && onImageHide !== undefined &&
                <div className={styles.HideButton} onClick={onHideImage}>
                    <div className={styles.ButtonTitle}>Peida</div>
                </div>
            }
            <div className={styles.ImageGallerySlider}>
                <div className={styles.SliderContainer}>
                    {renderNavigation(true)}
                    <div ref={sliderRef} className={clsx('keen-slider', styles.Slider)}>
                        {imageItems.map(image => {
                            return (
                                <div className={clsx('keen-slider__slide', styles.Image)} key={image.id}>
                                    <Image
                                        src={image.urlLarge}
                                        alt={image.title}
                                        layout={'fixed'}
                                        width={950}
                                        height={650}
                                        objectFit={'contain'}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    {renderNavigation(false)}
                </div>
                <div className={styles.ImageInfo}>
                    <div className={styles.ImageTitle}>
                        {currentSlideImage.title}
                    </div>
                    {currentSlideImage.user !== undefined &&
                        <div className={styles.UserInfoContainer}>
                            <div className={styles.UserInfo} onClick={() => router.push('/user/' + currentSlideImage.user?.id)}>
                                <div className={styles.UserAvatar}>
                                    <UserAvatar user={currentSlideImage.user} />
                                </div>
                                <div className={styles.UserName}>
                                    {currentSlideImage.user.name}
                                </div>
                            </div>
                        </div>
                    }
                    {renderDestinations()}
                </div>
            </div>
        </>
    )
}

export default ImageGallerySlider