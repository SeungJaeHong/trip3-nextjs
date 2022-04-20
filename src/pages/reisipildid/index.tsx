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
import {toast} from 'react-toastify'
import FormSelect from "../../components/Form/FormSelect"
import Button from "../../components/Button"

type Props = {
    images?: ImageType[]
    currentPage: number
    hasMore: boolean
    destinationId?: number
    destinationOptions: [{ label: string, value: string }]
}

const ImagesPage = ({images, currentPage, hasMore, destinationId, destinationOptions}: Props) => {
    const router = useRouter()
    const [imageItems, setImagesItems] = useState<ImageType[]|undefined>(images)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<ImageType | undefined>(undefined)
    const [selectedDestinationId, setSelectedDestinationId] = useState<number|undefined>(destinationId)

    useEffect(() => {
        setImagesItems(images)
    }, [images])

    useEffect(() => {
        setSelectedDestinationId(destinationId)
    }, [destinationId])

    const openGallery = (image: ImageType) => {
        setSelectedImage(image)
        setShowModal(true)
    }

    const getNextPageUrl = () => {
        if (!hasMore) {
            return undefined
        }

        const urlParams = {
            destination: selectedDestinationId,
            page: currentPage + 1
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (currentPage > 1) {
            const urlParams = {
                destination: selectedDestinationId,
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

    const onSelectDestination = (value: string) => {
        const destinationId = parseInt(value)
        const urlParams = {
            destination: destinationId,
            page: currentPage
        }

        const queryString = objectToQueryString(urlParams)
        router.push('/reisipildid?' + queryString)
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
                        <div>Reisipildid</div>
                        <div className={styles.AddNewButton} onClick={() => router.push(selectedDestinationId ? '/image/add?destination=' + selectedDestinationId : '/image/add')}>
                            <Button title={'Lisa uus'} />
                        </div>
                        <div className={styles.AddNewButtonMobile}>
                            <span>+</span>
                        </div>
                    </div>
                    <div className={styles.DestinationSelection}>
                        <div className={styles.Select}>
                            <FormSelect
                                id={'destination-select'}
                                options={destinationOptions}
                                placeholder={'Kõik sihtkohad'}
                                //value={selectedDestinationId?.toString()}
                                onChange={onSelectDestination} />
                        </div>
                    </div>
                    <div className={styles.ImagesContainer}>
                        <div className={styles.ImagesGrid}>
                            {imageItems?.map(image => {
                                return (
                                    <div className={styles.Image} key={image.id} onClick={() => openGallery(image)}>
                                        <Image
                                            src={image.urlSmallSquare}
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
    const destination = context.query?.destination
    let url = process.env.API_BASE_URL + '/images'

    const urlParams = {
        destination: destination,
        page: page
    }

    url += '?' + objectToQueryString(urlParams)
    const res = await ApiClientSSR(context).get(url)
    const destinationOptions: { value: string, label: string }[] = res.data.destinations.map((destination: any) => ({ label: destination.name, value: destination.id.toString() }))
    const data = {
        images: res.data?.imageData.images,
        currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
        hasMore: res.data?.imageData.hasMore,
        destinationId: destination ?? null,
        destinationOptions: destinationOptions
    }

    return {
        props: data
    }
}

export default ImagesPage