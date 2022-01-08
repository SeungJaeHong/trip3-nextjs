import {useState} from "react"
import {Image as ImageType} from "../../../types"
import {useKeenSlider} from 'keen-slider/react'
import styles from './ImageGallerySlider.module.scss'
import Image from 'next/image'
import clsx from "clsx"

type Props = {
    images: Array<ImageType>
    selectedImage: ImageType | undefined
}

const ImageGallerySlider = ({images}: Props) => {
    const [loaded, setLoaded] = useState<boolean>(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            console.log(slider, 'slider slideChanged')
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    type ArrowProps = {
        onClick: () => void
        disabled: boolean
        isLeft: boolean
    }

    const Arrow = ({onClick, disabled, isLeft}: ArrowProps) => {
        return (
            <div className={clsx(styles.Arrow, {
                [styles.ArrowDisabled]: disabled,
                [styles.Right]: !isLeft,
            })} onClick={onClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
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
                        onClick={() => instanceRef.current?.prev()}
                        disabled={currentSlide === 0}
                        isLeft={true}
                    />
                )
            } else {
                return (
                    <Arrow
                        onClick={() => instanceRef.current?.next()}
                        disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                        isLeft={false}
                    />
                )
            }
        } else {
            return null
        }
    }

    return (
        <div className={styles.ImageGallerySlider}>
            {renderNavigation(true)}
            <div ref={sliderRef} className={clsx('keen-slider', styles.Slider)}>
                {images.map(image => {
                    return (
                        <div className={clsx('keen-slider__slide', styles.Image)} key={image.id}>
                            <Image
                                src={image.urlLarge}
                                alt={image.title}
                                width={950}
                                height={650}
                                objectFit={'contain'}
                            />
                        </div>
                    )
                })}
            </div>
            {renderNavigation(false)}

            {/*{loaded && instanceRef.current && (
                <>
                    <Arrow
                        onClick={() => instanceRef.current?.prev()}
                        disabled={currentSlide === 0}
                        isLeft={true}
                    />

                    <Arrow
                        onClick={() => instanceRef.current?.next()}
                        disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                        isLeft={false}
                    />
                </>
            )}*/}
        </div>
    )
}

export default ImageGallerySlider