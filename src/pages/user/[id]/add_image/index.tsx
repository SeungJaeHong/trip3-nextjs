import React, {Fragment, useState} from "react"
import Navbar from "../../../../components/Navbar"
import styles from './UserAddImagePage.module.scss'
import clsx from "clsx"
import Footer from "../../../../components/Footer"
import containerStyle from "../../../../styles/containers.module.scss"
import BackgroundMap from "../../../../components/BackgroundMap"
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../../../lib/ApiClientSSR"
import MoreLink from "../../../../components/MoreLink"
import {Destination, User} from "../../../../types"
import ImageUploadForm from "../../../../components/ImageUploadForm"
import {uploadImage} from "../../../../services/user.service"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import LoadingSpinner2 from "../../../../components/LoadingSpinner2"

type Props = {
    user: User
    destinations: Destination[]
}

const UserAddImagePage = ({user, destinations}: Props) => {
    const router = useRouter()
    const [submitting, setSubmitting] = useState<boolean>(false)

    const onSubmit = (image: File, title: string, destinations: Destination[]) => {
        setSubmitting(true)
        uploadImage(user.id, image, title, destinations).then(res => {
            toast.success('Pildi salvestamine õnnestus')
            router.push('/user/' + user.id + '/images')
        }).catch(e => {
            toast.error('Pildi salvestamine ebaõnnestus')
        }).finally(() => console.log('finally'))
    }

    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>
                        Reisipildid
                    </div>
                </div>
                <div className={styles.Content}>
                    <div className={containerStyle.ContainerLg}>
                        <div className={styles.Body}>
                            <div className={styles.FormContainer}>
                                <div className={styles.Header}>
                                    Lisa uus reisipilt
                                </div>
                                <div className={styles.Form}>
                                    {submitting &&
                                        <div className={styles.FormSubmitOverLay}>
                                            <LoadingSpinner2 />
                                        </div>
                                    }
                                    <ImageUploadForm
                                        destinations={destinations}
                                        onSubmit={onSubmit} />
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
                                        <MoreLink route={'/kasutustingimused'} title={'Kasutustingimused'} medium={true} />
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
    const id = context.query.id
    try {
        const url = process.env.API_BASE_URL + '/user/' + id + '/addImage'
        const response: any = await ApiClientSSR(context).get(url)

        return {
            props: {
                user: response.data.user,
                destinations: response.data.destinations || []
            }
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/user/' + id,
                permanent: false,
            },
        }
    }
}

export default UserAddImagePage