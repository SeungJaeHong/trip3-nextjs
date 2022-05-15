import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../../../../components/Navbar'
import styles from '../../lisa-uus/NewsAddPage.module.scss'
import clsx from 'clsx'
import Footer from '../../../../components/Footer'
import containerStyle from '../../../../styles/containers.module.scss'
import BackgroundMap from '../../../../components/BackgroundMap'
import { useRouter } from 'next/router'
import useUser from '../../../../hooks'
import { Destination, NewsContent, Topic } from '../../../../types'
import LoadingSpinner from '../../../../components/LoadingSpinner'
import NewsForm from '../../../../components/News/NewsForm'
import { updateNews } from '../../../../services/news.service'
import { toast } from 'react-toastify'
import { GetServerSideProps } from 'next'
import ApiClientSSR from '../../../../lib/ApiClientSSR'
import { NextSeo } from 'next-seo'

type Props = {
    news: NewsContent
    destinations: Destination[]
    topics: Topic[]
}

const NewsEditPage = ({ news, destinations, topics }: Props) => {
    const router = useRouter()
    const { loading, userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [submitting, setSubmitting] = useState<boolean>(false)

    const onSubmit = (title: string, body: string, destinations: Destination[], image?: File, topics?: Topic[]) => {
        setSubmitting(true)
        updateNews(news.id, title, body, destinations, image, topics)
            .then((res) => {
                toast.success('Uudis muudetud')
                router.push('/uudised/' + res.data.slug)
            })
            .catch((e) => {
                toast.success('Uudise muutmine ebaõnnestus')
            })
            .finally(() => setSubmitting(false))
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
                    <LoadingSpinner />
                </div>
            )
        } else {
            return (
                <div className={styles.NewsForm}>
                    {submitting && (
                        <div className={styles.FormSubmitOverLay}>
                            <div className={styles.Loading}>
                                <LoadingSpinner />
                            </div>
                        </div>
                    )}
                    <NewsForm news={news} destinations={destinations} topics={topics} onSubmit={onSubmit} />
                </div>
            )
        }
    }

    return (
        <Fragment>
            <NextSeo nofollow={true} noindex={true} />
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Muuda uudist</div>
                </div>
                <div className={styles.Content}>
                    <div className={containerStyle.ContainerLg}>
                        <div className={containerStyle.CenteredContainer}>
                            <div className={styles.Body}>{renderContent()}</div>
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
        const id = context.query.id
        const url = process.env.API_BASE_URL + '/news/' + id + '/edit'
        const response: any = await ApiClientSSR(context).get(url)
        return {
            props: {
                news: response.data.news,
                destinations: response.data.destinations || [],
                topics: response.data.topics || [],
            },
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

export default NewsEditPage
