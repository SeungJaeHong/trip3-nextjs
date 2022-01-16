import React, {Fragment} from "react"
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

type Props = {
    images?: ImageType[]
    currentPage: number
    hasMore: boolean
}

const ImagesPage = ({images, currentPage, hasMore}: Props) => {
    const router = useRouter()
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
                            {images?.map(image => {
                                return (
                                    <div className={styles.Image} key={image.id}>
                                        <Image
                                            src={image.urlSmall}
                                            alt={image.title}
                                            layout={'fill'}
                                            objectFit={'cover'}
                                            priority={true} />
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