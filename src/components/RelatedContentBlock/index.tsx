import styles from './RelatedContentBlock.module.scss'
import containerStyle from '../../styles/containers.module.scss'
import React from 'react'
import FlightOffersLatest from '../FlightOffer/FlightOffersLatest'
import TravelmatesLatest from '../Travelmate/TravelmatesLatest'
import NewsLatest from '../News/NewsLatest'
import ForumLatest from '../Forum/ForumLatest'

type Props = {
    type: string
}

const RelatedContentBlock = ({ type }: Props) => {
    const renderContentByType = () => {
        switch (type) {
            case 'forum':
                return (
                    <>
                        <div className={styles.Column}>
                            <FlightOffersLatest />
                            <TravelmatesLatest />
                        </div>
                        <div className={styles.Row}>
                            <NewsLatest />
                        </div>
                    </>
                )
            case 'flight':
                return (
                    <>
                        <div className={styles.Column}>
                            <ForumLatest />
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
                            <ForumLatest />
                        </div>
                        <div className={styles.Row}>
                            <NewsLatest />
                        </div>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <div className={styles.Container}>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.Content}>{renderContentByType()}</div>
            </div>
        </div>
    )
}

export default RelatedContentBlock
