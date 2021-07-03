import styles from './FlightOffersLatest.module.scss'
import BlockTitle from "../../BlockTitle"
import {useEffect, useState} from "react"
import {getLatestFlights} from "../../../api/flights"
import FlightOfferList from "../FlightOfferList";
import MoreLink from "../../MoreLink";

const FlightOffersLatest = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const getFlights = async () => {
            const result = await getLatestFlights()
            setFlights(result.data.flightOffers);
        }

        getFlights()
    }, [])

    return (
        <div className={styles.FlightOffersLatest}>
            <BlockTitle title={'Lennupakkumised'} route={'/'} />
            <div className={styles.Content}>
                <FlightOfferList items={flights} />
            </div>
            <div className={styles.ViewMore}>
                <MoreLink route={'/'} title={'Kõik pakkumised'} />
            </div>
        </div>
    )
}

export default FlightOffersLatest