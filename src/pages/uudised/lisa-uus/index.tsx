import React, {Fragment, useEffect, useState} from "react"
import Navbar from "../../../components/Navbar"
import styles from './NewsAddPage.module.scss'
import clsx from "clsx"
import Footer from "../../../components/Footer"
import containerStyle from "../../../styles/containers.module.scss"
import BackgroundMap from "../../../components/BackgroundMap"
import {useRouter} from "next/router"
import useUser from "../../../hooks"
import {Destination, Topic} from "../../../types"
import LoadingSpinner2 from "../../../components/LoadingSpinner2"
import NewsForm from "../../../components/News/NewsForm"
import {addNews} from "../../../services/news.service"
import {toast} from 'react-toastify'
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../../lib/ApiClientSSR"

type Props = {
    destinations: Destination[]
    topics: Topic[]
}

const NewsAddPage = ({destinations, topics}: Props) => {
    const router = useRouter()
    const { loading, userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [submitting, setSubmitting] = useState<boolean>(false)

    const onSubmit = (title: string, body: string, destinations: Destination[], image: File, topics?: Topic[]) => {
        setSubmitting(true)
        addNews(title, image, body, destinations, topics).then(res => {
            toast.success('Uudis lisatud')
            router.push('/uudised/' + res.data.slug)
        }).catch(e => {
            toast.error('Uudise lisamine ebaõnnestus')
        }).finally(() => setSubmitting(false))
    }

    useEffect(() => {
        if (!loading) {
            if (!userIsAdmin) {
                router.push('/uudised')
            }
        }
    }, [user, loading])

    const renderContent = () => {
        if (loading) {
            return (
                <div className={styles.Loader}>
                    <LoadingSpinner2 />
                </div>
            )
        } else {
            return (
                <div className={styles.NewsForm}>
                    {submitting &&
                        <div className={styles.FormSubmitOverLay}>
                            <LoadingSpinner2 />
                        </div>
                    }
                    <NewsForm
                        destinations={destinations}
                        topics={topics}
                        // @ts-ignore
                        onSubmit={onSubmit} />
                </div>
            )
        }
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
                        Lisa uus uudis
                    </div>
                </div>
                <div className={styles.Content}>
                    <div className={containerStyle.ContainerLg}>
                        <div className={containerStyle.CenteredContainer}>
                            <div className={styles.Body}>
                                {renderContent()}
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
        const url = process.env.API_BASE_URL + '/news/add'
        const response: any = await ApiClientSSR(context).get(url)

        return {
            props: {
                destinations: response.data.destinations || [],
                topics: response.data.topics || []
            }
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/uudised',
                permanent: false,
            },
        }
    }
}

export default NewsAddPage