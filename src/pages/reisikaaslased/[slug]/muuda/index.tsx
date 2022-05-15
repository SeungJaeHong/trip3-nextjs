import React, { Fragment } from 'react'
import Header from '../../../../components/Header'
import { GetServerSideProps } from 'next'
import containerStyle from '../../../../styles/containers.module.scss'
import styles from '../../lisa-uus/TravelmateAddPage.module.scss'
import { Destination, Topic, TravelmateContent } from '../../../../types'
import TravelmateForm from '../../../../components/Travelmate/TravelmateForm'
import MoreLink from '../../../../components/MoreLink'
import Footer from '../../../../components/Footer'
import ApiClientSSR from '../../../../lib/ApiClientSSR'
import { NextSeo } from 'next-seo'

type Props = {
    travelmate: TravelmateContent
    destinations: Destination[]
    topics: Topic[]
    durationOptions: { value: string; label: string }[]
    monthOptions: { value: string; label: string }[]
}

const TravelmateEditPage = ({ travelmate, destinations, topics, durationOptions, monthOptions }: Props) => {
    return (
        <Fragment>
            <NextSeo nofollow={true} noindex={true} />
            <Header title={'Reisikaaslased'} className={styles.Header} />
            <div className={containerStyle.ContainerXl}>
                <div className={styles.ContentContainer}>
                    <div className={styles.Content}>
                        <div className={styles.FormTitle}>Muuda kuulutust</div>
                        <div className={styles.Form}>
                            <TravelmateForm
                                travelmate={travelmate}
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
        const id = context.query.slug
        const url = process.env.API_BASE_URL + '/travelmate/' + id + '/edit'
        const response: any = await ApiClientSSR(context).get(url)
        return {
            props: {
                travelmate: response.data.travelmate,
                destinations: response.data.destinations || [],
                topics: response.data.topics || [],
                durationOptions: response.data.durationOptions,
                monthOptions: response.data.monthOptions,
            },
        }
    } catch (e) {
        return {
            notFound: true,
        }
    }
}

export default TravelmateEditPage
