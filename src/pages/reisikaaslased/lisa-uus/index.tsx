import React, { Fragment, useState } from 'react'
import Header from '../../../components/Header'
import { GetServerSideProps } from 'next'
import containerStyle from '../../../styles/containers.module.scss'
import styles from './TravelmateAddPage.module.scss'
import { Destination, Topic } from '../../../types'
import { useRouter } from 'next/router'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import Footer from '../../../components/Footer'
import MoreLink from '../../../components/MoreLink'
import TravelmateForm from '../../../components/Travelmate/TravelmateForm'

type Props = {
    destinations: Destination[]
    topics: Topic[]
    durationOptions: { value: string; label: string }[]
    monthOptions: { value: string; label: string }[]
}

const TravelmateAddPage = ({ destinations, topics, durationOptions, monthOptions}: Props) => {
    const router = useRouter()
    return (
        <Fragment>
            <Header title={'Reisikaaslased'} className={styles.Header} />
            <div className={containerStyle.ContainerXl}>
                <div className={styles.ContentContainer}>
                    <div className={styles.Content}>
                        <div className={styles.FormTitle}>Lisa uus kuulutus</div>
                        <div className={styles.Form}>
                            <TravelmateForm
                                destinations={destinations}
                                topics={topics}
                                durationOptions={durationOptions}
                                monthOptions={monthOptions}
                            />
                        </div>
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.Rules}>
                            <h3>Hea teada</h3>
                            <div className={styles.RulesBody}>
                                <p>
                                    Austan eesti keele reegleid, jälgin, et minu kirjutised oleksid loetavad. Ma ei
                                    kasuta slängi, suurtähti ja korduvaid kirjavahemärke ning kasutan suuri algustähti
                                    lause alguses ja kohanimedes.
                                </p>
                                <p>
                                    Ma ei avalda reklaamisisuga teateid, selleks kasutan Trip.ee{' '}
                                    <a href={'/reklaam'}>reklaamivõimalust.</a>
                                </p>
                                <p>
                                    Tean ja nõustun, et kasutustingimuste rikkumisel võidakse minu kasutajakonto ilma
                                    hoiatamata sulgeda ja/või minu ligipääs Trip.ee&apos;le blokeerida.
                                </p>
                                <MoreLink route={'/kasutustingimused'} title={'Kasutustingimused'} medium={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const url = process.env.API_BASE_URL + '/travelmates/add'
        const response: any = await ApiClientSSR(context).get(url)
        return {
            props: {
                destinations: response.data.destinations || [],
                topics: response.data.topics || [],
                durationOptions: response.data.durationOptions,
                monthOptions: response.data.monthOptions,
            },
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/reisikaaslased',
                permanent: false,
            },
        }
    }
}

export default TravelmateAddPage
