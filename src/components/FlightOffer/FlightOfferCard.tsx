import Link from 'next/link'
import type { Content } from '../../types'
import styles from './FlightOfferCard.module.scss'
import React from "react";

type Props = {
    //content: Content,
    content: any, //todo: remove after
    color: string
}

const FlightOfferCard = (props: Props) => {
    return (
        <div className={styles.FlightOfferCard}>
            <div className={styles.DestinationContainer} style={{'backgroundColor': props.color}}>
                <div className={styles.Destination}>
                    Hispaania
                </div>
                <div className={styles.ParentDestinations}>
                    Euroopa
                </div>
            </div>
            <div className={styles.Content} style={
                {
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://www.trip.ee/images/medium/altea-2333716_960_720_5lav.jpeg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%"
                }
            }>
                <div className={styles.Title}>
                    Lufthansa Tallinnast Hispaaniasse: Malaga, Valencia, Barcelona, Madrid al 91€
                </div>
            </div>
        </div>
    )
}

export default FlightOfferCard