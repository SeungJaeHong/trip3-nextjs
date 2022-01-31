import React, {Fragment, useEffect, useState} from "react"
import Navbar from "../../../components/Navbar"
import styles from './NewsAddPage.module.scss'
import clsx from "clsx"
import Footer from "../../../components/Footer"
import containerStyle from "../../../styles/containers.module.scss"
import BackgroundMap from "../../../components/BackgroundMap"
import {useRouter} from "next/router"
import useUser from "../../../hooks"
import {Destination} from "../../../types"
import LoadingSpinner2 from "../../../components/LoadingSpinner2"
import {getDestinations} from "../../../services/destination.service"
import NewsForm from "../../../components/News/NewsForm"
import {addNews} from "../../../services/news.service"
import {toast} from "react-hot-toast"

const NewsAddPage = () => {
    const router = useRouter()
    const { loading, userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [destinations, setDestinations] = useState<Destination[]>([])
    const [submitting, setSubmitting] = useState<boolean>(false)

    const onSubmit = (title: string, image: File, body: string, destinations: Destination[]) => {
        setSubmitting(true)
        addNews(title, image, body, destinations).then(res => {
            toast.success('Uudis lisatud')
            router.push('/uudised/' + res.data.slug)
        }).catch(e => {
            toast.success('Uudise lisamine ebaõnnestus')
        }).finally(() => setSubmitting(false))
    }

    useEffect(() => {
        if (!loading) {
            if (!userIsAdmin) {
                router.push('/uudised')
            }
        }
    }, [user, loading])

    useEffect(() => {
        getDestinations().then(res => {
            setDestinations(res.data)
        })
    }, [])

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

export default NewsAddPage