import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../../../../components/Navbar'
import styles from '../../lisa-uus/FlightOfferAddPage.module.scss'
import clsx from 'clsx'
import Footer from '../../../../components/Footer'
import containerStyle from '../../../../styles/containers.module.scss'
import BackgroundMap from '../../../../components/BackgroundMap'
import { useRouter } from 'next/router'
import useUser from '../../../../hooks'
import { Destination, FlightContent, Tag } from '../../../../types'
import LoadingSpinner from '../../../../components/LoadingSpinner'
import { GetServerSideProps } from 'next'
import ApiClientSSR from '../../../../lib/ApiClientSSR'
import FlightForm from '../../../../components/FlightOffer/FlightForm'
import { toast } from 'react-toastify'
import { updateFlight } from '../../../../services/flight.service'

type Props = {
    flight: FlightContent
    destinations: Destination[]
    tags: Tag[]
}

const FlightOfferEditPage = ({ flight, destinations, tags }: Props) => {
    const router = useRouter()
    const { loading, userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const [submitting, setSubmitting] = useState<boolean>(false)

    //todo: move to form component?
    const onSubmit = (values: any) => {
        setSubmitting(true)
        updateFlight(flight, values)
            .then((res) => {
                toast.success('Pakkumine muudetud')
                router.push('/odavad-lennupiletid/' + res.data.slug)
            })
            .catch((e) => {
                toast.error('Pakkumise muutmine ebaõnnestus')
            })
            .finally(() => setSubmitting(false))
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
                    <LoadingSpinner />
                </div>
            )
        } else {
            return (
                <div className={styles.FlightForm}>
                    {submitting && (
                        <>
                            <div className={styles.FormSubmitOverLay} />
                            <div className={styles.Loading}>
                                <LoadingSpinner />
                            </div>
                        </>
                    )}
                    <FlightForm flight={flight} destinations={destinations} tags={tags} onSubmit={onSubmit} />
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
        const id = context.query.id
        const url = process.env.API_BASE_URL + '/flight/' + id + '/edit'
        const response: any = await ApiClientSSR(context).get(url)

        return {
            props: {
                flight: response.data.flight,
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

export default FlightOfferEditPage
