import styles from './FlightOffersLatest.module.scss'
import BlockTitle from '../../BlockTitle'
import { useEffect, useState } from 'react'
import FlightOfferList from '../FlightOfferList'
import MoreLink from '../../MoreLink'
import { getLatestFlights } from '../../../services/flight.service'
import { FlightOfferRowType } from '../../../types'

type Props = {
    take: number
    title: string
    excludeId?: number
}

const FlightOffersLatest = ({ take, title, excludeId }: Props) => {
    const [flights, setFlights] = useState<FlightOfferRowType[]>([])

    useEffect(() => {
        getLatestFlights(take, excludeId).then((res) => {
            setFlights(res.data)
        })
    }, [])

    return (
        <div className={styles.FlightOffersLatest}>
            <BlockTitle title={title} />
            <div className={styles.Content}>
                <FlightOfferList items={flights} />
            </div>
            <div className={styles.ViewMore}>
                <MoreLink route={'/odavad-lennupiletid'} title={'Kõik pakkumised'} />
            </div>
        </div>
    )
}

FlightOffersLatest.defaultProps = {
    take: 3,
    title: 'Lennupakkumised',
}

export default FlightOffersLatest
