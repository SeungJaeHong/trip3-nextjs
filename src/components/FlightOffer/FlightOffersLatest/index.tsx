import styles from './FlightOffersLatest.module.scss'
import BlockTitle from "../../BlockTitle"
import {useEffect, useState} from "react"
import FlightOfferList from "../FlightOfferList"
import MoreLink from "../../MoreLink"
import {getLatestFlights} from "../../../services/flight.service"

const FlightOffersLatest = () => {
    const [flights, setFlights] = useState([])

    useEffect(() => {
        const getFlights = async () => {
            const result = await getLatestFlights()
            setFlights(result.data.flightOffers)
        }

        getFlights()
    }, [])

    return (
        <div className={styles.FlightOffersLatest}>
            <BlockTitle title={'Lennupakkumised'} />
            <div className={styles.Content}>
                <FlightOfferList items={flights} />
            </div>
            <div className={styles.ViewMore}>
                <MoreLink route={'/odavad-lennupiletid'} title={'Kõik pakkumised'} />
            </div>
        </div>
    )
}

export default FlightOffersLatest