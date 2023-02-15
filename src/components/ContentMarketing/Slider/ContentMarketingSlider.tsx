import React, { useState } from 'react'
import { ContentMarketingPost } from '../../../types'
import { useRouter } from 'next/router'
import { useKeenSlider } from 'keen-slider/react'
import styles from './ContentMarketingSlider.module.scss'
import clsx from 'clsx'
import ContentMarketingSlideItem from '../SlideItem'

type ArrowProps = {
    onClick: (e: any) => void
    disabled: boolean
    isLeft: boolean
}

type Props = {
    posts: ContentMarketingPost[]
}

const ContentMarketingSlider = ({ posts }: Props) => {
    const router = useRouter()
    const [loaded, setLoaded] = useState<boolean>(false)
    const [currentSlide, setCurrentSlide] = useState<number>(0)

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            loop: true,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created(slider) {
                setLoaded(true)
            },
        },
        [
            (slider) => {
                if (posts.length <= 1) {
                    return
                }

                let timeout: ReturnType<typeof setTimeout>
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 10000)
                }
                slider.on('created', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on('dragStarted', clearNextTimeout)
                slider.on('animationEnded', nextTimeout)
                slider.on('updated', nextTimeout)
            },
        ]
    )

    const Arrow = ({ onClick, disabled, isLeft }: ArrowProps) => {
        return (
            <div
                className={clsx(styles.Arrow, {
                    //[styles.ArrowDisabled]: disabled,
                    [styles.Right]: !isLeft,
                })}
                onClick={onClick}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {isLeft && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
                    {!isLeft && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
                </svg>
            </div>
        )
    }

    const renderNavigation = (isLeft: boolean) => {
        if (posts.length <= 1) {
            return null
        }

        if (loaded && instanceRef.current) {
            if (isLeft) {
                return (
                    <Arrow
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                        disabled={currentSlide === 0}
                        isLeft={true}
                    />
                )
            } else {
                return (
                    <Arrow
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
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
        <div className={styles.Container}>
            <div className={styles.SliderContainer}>
                {renderNavigation(true)}
                <div ref={sliderRef} className={clsx('keen-slider', styles.Slider)}>
                    {posts.map((post) => {
                        return (
                            <div className={clsx('keen-slider__slide', styles.Slide)} key={post.id} onClick={() => router.push('/sisuturundus/' + post.slug)}>
                                <ContentMarketingSlideItem {...post} />
                            </div>
                        )
                    })}
                </div>
                {renderNavigation(false)}
            </div>
        </div>
    )
}

export default ContentMarketingSlider
