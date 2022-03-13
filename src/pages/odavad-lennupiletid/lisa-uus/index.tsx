import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import styles from './FlightOfferAddPage.module.scss'
import clsx from 'clsx'
import Footer from '../../../components/Footer'
import containerStyle from '../../../styles/containers.module.scss'
import BackgroundMap from '../../../components/BackgroundMap'
import { useRouter } from 'next/router'
import useUser from '../../../hooks'
import { Destination, Tag } from '../../../types'
import LoadingSpinner2 from '../../../components/LoadingSpinner2'
import { GetServerSideProps } from 'next'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import FlightForm from '../../../components/FlightOffer/FlightForm'

type Props = {
    destinations: Destination[]
    tags: Tag[]
}

const FlightOfferAddPage = ({ destinations, tags }: Props) => {
    const router = useRouter()
    const { loading, userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [submitting, setSubmitting] = useState<boolean>(false)

    const onSubmit = (values: any) => {
        console.log(values)
    }

    useEffect(() => {
        if (!loading) {
            if (!userIsAdmin) {
                router.push('/odavad-lennupiletid')
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
                <div className={styles.FlightForm}>
                    {submitting && (
                        <div className={styles.FormSubmitOverLay}>
                            <LoadingSpinner2 />
                        </div>
                    )}
                    <FlightForm destinations={destinations} tags={tags} onSubmit={onSubmit} />
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
                    <div className={styles.Title}>Lisa uus pakkumine</div>
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
        const url = process.env.API_BASE_URL + '/flights/add'
        const response: any = await ApiClientSSR(context).get(url)

        return {
            props: {
                destinations: response.data.destinations || [],
                tags: response.data.tags || [],
            },
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/odavad-lennupiletid',
                permanent: false,
            },
        }
    }
}

export default FlightOfferAddPage
