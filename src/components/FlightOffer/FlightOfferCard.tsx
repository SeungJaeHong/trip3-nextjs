import Link from 'next/link'
import type { Content } from '../../types'
import styles from './FlightOfferCard.module.scss'

type Props = {
    content: Content,
    color: string
}

const FlightOfferCard = (props: Props) => {
    return (
        <div className={styles.FlightOfferCard}>
            <div className={styles.DestinationContainer} style={{'backgroundColor': props.color}}>
                <div className={styles.Destination}>
                    <Link href={'/'}>
                        <a>Hispaania</a>
                    </Link>
                </div>
                <div className={styles.ParentDestination}>
                    <Link href={'/'}>
                        <a>Euroopa</a>
                    </Link>
                </div>
            </div>

            <Link href={'/'}>
                <a className={styles.Content}>
                    <div className={styles.Background} style={
                        {
                            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://www.trip.ee/images/medium/altea-2333716_960_720_5lav.jpeg)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "50% 50%"
                        }
                    }>
                    </div>
                    <div className={styles.Title}>
                        {props.content.title}
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default FlightOfferCard