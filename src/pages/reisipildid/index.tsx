import React, {Fragment, useEffect, useState} from "react"
import Navbar from "../../components/Navbar"
import styles from './ImagesPage.module.scss'
import clsx from "clsx"
import Footer from "../../components/Footer"
import containerStyle from "../../styles/containers.module.scss"
import BackgroundMap from "../../components/BackgroundMap"
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../lib/ApiClientSSR"
import {useRouter} from "next/router"
import {objectToQueryString} from "../../helpers"
import {Image as ImageType} from "../../types"
import Image from 'next/image'
import SimplePaginator from "../../components/Paginator/SimplePaginator"
import ImageGalleryModal from "../../components/ImageGallery/ImageGalleryModal"
import {hidePhoto} from "../../services/general.service"
import {toast} from "react-hot-toast"

type Props = {
    images?: ImageType[]
    currentPage: number
    hasMore: boolean
}

const ImagesPage = ({images, currentPage, hasMore}: Props) => {
    const router = useRouter()
    const [imageItems, setImagesItems] = useState<ImageType[]|undefined>(images)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<ImageType | undefined>(undefined)

    useEffect(() => {
        setImagesItems(images)
    }, [images])

    const openGallery = (image: ImageType) => {
        setSelectedImage(image)
        setShowModal(true)
    }

    const getNextPageUrl = () => {
        if (!hasMore) {
            return undefined
        }

        const urlParams = {
            page: currentPage + 1
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (currentPage > 1) {
            const urlParams = {
                page: currentPage - 1
            }

            const queryString = objectToQueryString(urlParams)
            return router.pathname + '?' + queryString
        } else {
            return undefined
        }
    }

    const hideImage = async (image: ImageType) => {
        await hidePhoto(image.id).then(res => {
            const newImages = imageItems?.filter(img => img.id !== image.id)
            setImagesItems(newImages)
            toast.success('Pilt peidetud')
        }).catch(e => {
            toast.error('Pildi peitmine ebaõnnestus')
        })
    }

    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerLg}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>
                        Reisipildid
                    </div>
                    <div className={styles.ImagesContainer}>
                        <div className={styles.ImagesGrid}>
                            {imageItems?.map(image => {
                                return (
                                    <div className={styles.Image} key={image.id} onClick={() => openGallery(image)}>
                                        <Image
                                            src={image.urlSmall}
                                            alt={image.title}
                                            layout={'fill'}
                                            objectFit={'cover'} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.Paginator}>
                            <SimplePaginator
                                nextPageUrl={getNextPageUrl()}
                                previousPageUrl={getPreviousPageUrl()} />
                        </div>
                    </div>
                </div>
            </div>
            {imageItems && selectedImage !== undefined &&
                <ImageGalleryModal
                    show={showModal}
                    images={imageItems}
                    selectedImage={selectedImage}
                    onHide={() => setShowModal(false)}
                    onImageHide={hideImage} />
            }
            <Footer simple={true} />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query?.page
    let url = process.env.API_BASE_URL + '/images'
    if (page) {
        url += '?page=' + page
    }

    const data = {
        images: [],
        currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
        hasMore: false,
    }

    const res = await ApiClientSSR(context).get(url)
    data.images = res.data?.items
    data.hasMore = res.data?.hasMore

    return {
        props: data
    }
}

export default ImagesPage