import React, { Fragment, useState } from 'react'
import Navbar from '../../../components/Navbar'
import styles from './ImageAddPage.module.scss'
import clsx from 'clsx'
import Footer from '../../../components/Footer'
import containerStyle from '../../../styles/containers.module.scss'
import BackgroundMap from '../../../components/BackgroundMap'
import { GetServerSideProps } from 'next'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import MoreLink from '../../../components/MoreLink'
import { Destination, User } from '../../../types'
import ImageUploadForm from '../../../components/ImageUploadForm'
import { uploadImage } from '../../../services/image.service'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../../components/LoadingSpinner'

type Props = {
    user: User
    destinations: Destination[]
}

const ImageAddPage = ({ user, destinations }: Props) => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState<boolean>(false)

    const onSubmit = (image: File, title: string, destinations: Destination[]) => {
        setSubmitting(true)
        uploadImage(image, title, destinations)
            .then((res) => {
                const destinationId = router.query?.destination
                if (parseInt(String(destinationId))) {
                    router.push('/reisipildid?destination=' + destinationId)
                } else {
                    router.push('/user/' + user.id + '/images')
                }

                toast.success('Pildi salvestamine õnnestus')
            })
            .catch((e) => {
                toast.error('Pildi salvestamine ebaõnnestus')
            })
            .finally(() => setSubmitting(false))
    }

    const getSelectedDestination = () => {
        const destinationId = router.query?.destination
        if (destinationId && String(destinationId)) {
            const value = destinations.filter((dest) => dest.id === parseInt(String(destinationId)))
            if (value && value.length === 1) {
                return value[0]
            }
        }

        return undefined
    }

    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Reisipildid</div>
                </div>
                <div className={styles.Content}>
                    <div className={containerStyle.ContainerLg}>
                        <div className={styles.Body}>
                            <div className={styles.FormContainer}>
                                <div className={styles.Header}>Lisa uus reisipilt</div>
                                <div className={styles.Form}>
                                    {submitting && (
                                        <div className={styles.FormSubmitOverLay}>
                                            <div className={styles.Loading}>
                                                <LoadingSpinner />
                                            </div>
                                        </div>
                                    )}
                                    <ImageUploadForm
                                        destinations={destinations}
                                        onSubmit={onSubmit}
                                        selectedDestination={getSelectedDestination()}
                                    />
                                </div>
                            </div>
                            <div className={styles.Sidebar}>
                                <div className={styles.ImageRules}>
                                    <h3>Hea teada</h3>
                                    <div className={styles.ImageRulesBody}>
                                        <p>
                                            Pildi suurus võib olla maksimaalselt <strong>5mb</strong>.
                                        </p>
                                        <p>
                                            Lubatud pildi laiendused: <strong>jpg, png, jpeg</strong>
                                        </p>
                                        <MoreLink
                                            route={'/kasutustingimused'}
                                            title={'Kasutustingimused'}
                                            medium={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer simple={false} />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const url = process.env.API_BASE_URL + '/image/add'
        const response: any = await ApiClientSSR(context).get(url)

        return {
            props: {
                user: response.data.user,
                destinations: response.data.destinations || [],
            },
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/reisipildid',
                permanent: false,
            },
        }
    }
}

export default ImageAddPage
