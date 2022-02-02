import React, {Fragment, useEffect, useState} from "react"
import Navbar from "../../../../components/Navbar"
import styles from '../../../reisipildid/ImagesPage.module.scss'
import clsx from "clsx"
import Footer from "../../../../components/Footer"
import containerStyle from "../../../../styles/containers.module.scss"
import BackgroundMap from "../../../../components/BackgroundMap"
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../../../lib/ApiClientSSR"
import {useRouter} from "next/router"
import {objectToQueryString} from "../../../../helpers"
import {Image as ImageType, User} from "../../../../types"
import Image from 'next/image'
import SimplePaginator from "../../../../components/Paginator/SimplePaginator"
import ImageGalleryModal from "../../../../components/ImageGallery/ImageGalleryModal"
import {hidePhoto} from "../../../../services/general.service"
import {toast} from 'react-toastify'
import UserAvatar from "../../../../components/User/UserAvatar"
import Button from "../../../../components/Button"
import useUser from "../../../../hooks"

type Props = {
    targetUser: User
    images?: ImageType[]
    currentPage: number
    hasMore: boolean
}

const UserImagesPage = ({targetUser, images, currentPage, hasMore}: Props) => {
    const router = useRouter()
    const [imageItems, setImagesItems] = useState<ImageType[]|undefined>(images)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<ImageType | undefined>(undefined)
    const { user } = useUser()
    const isUserOwner = targetUser.id === user?.id

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
            id: targetUser.id,
            page: currentPage + 1
        }

        const queryString = objectToQueryString(urlParams)
        return router.pathname + '?' + queryString
    }

    const getPreviousPageUrl = () => {
        if (currentPage > 1) {
            const urlParams = {
                id: targetUser.id,
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
                        <div>Reisipildid</div>
                        {isUserOwner &&
                            <div className={styles.AddNewButton}>
                                <Button title={'Lisa uus'} route={'/image/add'} />
                            </div>
                        }
                        <div className={styles.AddNewButtonMobile}>
                            <span>+</span>
                        </div>
                    </div>
                    <div className={styles.UserContainer}>
                        <div className={styles.User} onClick={() => router.push('/user/' + targetUser.id)}>
                            <div className={styles.UserAvatar}>
                                <UserAvatar user={targetUser} />
                            </div>
                            <div className={styles.UserName}>
                                {targetUser.name}
                            </div>
                        </div>
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
    const id = context.query?.id
    let url = process.env.API_BASE_URL + '/images/user/' + id
    if (page) {
        url += '?page=' + page
    }

    const res = await ApiClientSSR(context).get(url)
    const data = {
        targetUser: res.data?.user,
        images: res.data?.imageData.images,
        currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
        hasMore: res.data?.imageData.hasMore,
    }

    return {
        props: data
    }
}

export default UserImagesPage