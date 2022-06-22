import styles from './FlightOffersLatest.module.scss'
import BlockTitle from '../../BlockTitle'
import { useEffect, useState } from 'react'
import FlightOfferList from '../FlightOfferList'
import MoreLink from '../../MoreLink'
import { getLatestFlights } from '../../../services/flight.service'
import { FlightOfferRowType } from '../../../types'
import SkeletonLoader from '../../SkeletonLoader'
import { useIsMounted } from '../../../hooks'

type Props = {
    take: number
    title: string
    excludeId?: number
    destinationId?: number
}

const FlightOffersLatest = ({ take, title, excludeId, destinationId }: Props) => {
    const [flights, setFlights] = useState<FlightOfferRowType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const isMounted = useIsMounted()

    useEffect(() => {
        getLatestFlights(take, excludeId, destinationId)
            .then((res) => {
                if (isMounted()) {
                    setFlights(res.data)
                }
            })
            .catch((e) => {})
            .finally(() => {
                if (isMounted()) {
                    setLoading(false)
                }
            })
    }, [destinationId, excludeId])

    const renderContent = () => {
        if (loading) {
            return <SkeletonLoader />
        } else {
            return <FlightOfferList items={flights} />
        }
    }

    return (
        <div className={styles.FlightOffersLatest}>
            <BlockTitle title={title} />
            <div className={styles.Content}>{renderContent()}</div>
            {!loading && (
                <div className={styles.ViewMore}>
                    <MoreLink route={'/odavad-lennupiletid'} title={'Kõik pakkumised'} />
                </div>
            )}
        </div>
    )
}

FlightOffersLatest.defaultProps = {
    take: 3,
    title: 'Lennupakkumised',
}

export default FlightOffersLatest
