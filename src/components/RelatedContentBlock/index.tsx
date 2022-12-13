import styles from './RelatedContentBlock.module.scss'
import containerStyle from '../../styles/containers.module.scss'
import React from 'react'
import FlightOffersLatest from '../FlightOffer/FlightOffersLatest'
import TravelmatesLatest from '../Travelmate/TravelmatesLatest'
import NewsLatest from '../News/NewsLatest'
import ForumLatest from '../Forum/ForumLatest'
import clsx from 'clsx'
import dynamic from "next/dynamic"

const Ads = dynamic(() => import('../Ads'), { ssr: false })

type Props = {
    type: string
    destinationId?: number
    ad?: string
    ad2?: string
}

const RelatedContentBlock = ({ type, destinationId, ad, ad2 }: Props) => {
    const renderContentByType = () => {
        switch (type) {
            case 'forum':
                return (
                    <>
                        <div className={styles.Column}>
                            <FlightOffersLatest />
                            {ad ? <div className={styles.Ad}><Ads type={ad} /></div> : null}
                            <TravelmatesLatest />
                        </div>
                        {/*{ad2 ? <div className={styles.Ad}><Ads type={ad2} /></div> : null}*/}
                        <div className={styles.Row}>
                            <NewsLatest ad={ad2} />
                        </div>
                    </>
                )
            case 'flight':
                return (
                    <>
                        <div className={styles.Column}>
                            <ForumLatest />
                            {ad ? <div className={styles.Ad}><Ads type={ad} /></div> : null}
                            <TravelmatesLatest />
                        </div>
                        <div className={styles.Row}>
                            <NewsLatest />
                        </div>
                    </>
                )
            case 'travelmate':
                return (
                    <>
                        <div className={styles.Column}>
                            <FlightOffersLatest />
                            {ad ? <div className={styles.Ad}><Ads type={ad} /></div> : null}
                            <ForumLatest />
                        </div>
                        <div className={styles.Row}>
                            <NewsLatest />
                        </div>
                    </>
                )
            case 'news':
                return (
                    <>
                        <div className={styles.Column}>
                            <FlightOffersLatest />
                            {ad ? <div className={styles.Ad}><Ads type={ad} /></div> : null}
                            <ForumLatest />
                        </div>
                        <div className={styles.Row}>
                            <TravelmatesLatest grid={true} />
                        </div>
                    </>
                )
            case 'destination':
                return (
                    <>
                        <div className={styles.Column}>
                            <FlightOffersLatest take={5} destinationId={destinationId} />
                            <TravelmatesLatest take={5} destinationId={destinationId} />
                        </div>
                        <div className={styles.Row}>
                            <NewsLatest destinationId={destinationId} />
                        </div>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className={styles.Container}>
            <div className={clsx(containerStyle.ContainerXl, styles.FlexColumn)}>
                <div className={styles.Content}>{renderContentByType()}</div>
                <Ads type={'footer'} />
            </div>
        </div>
    )
}

export default RelatedContentBlock
