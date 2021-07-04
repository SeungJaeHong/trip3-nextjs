import Link from 'next/link'
import type {FlightOfferCardType} from '../../../types'
import styles from './FlightOfferCard.module.scss'

const FlightOfferCard = (item: FlightOfferCardType) => {
    const getColor = () => {
        switch(item.color) {
            case 'purple':
                return '#8b84d7'
            case 'yellow':
                return '#f5b800'
            default:
                return '#FF5050'
        }
    }

    return (
        <div className={styles.FlightOfferCard}>
            <div className={styles.DestinationContainer} style={{'backgroundColor': getColor()}}>
                <div className={styles.Destination}>
                    <Link href={'/'}>
                        <a>{item.destination?.name}</a>
                    </Link>
                </div>
                <div className={styles.ParentDestination}>
                    <Link href={'/'}>
                        <a>{item.destination?.parentDestination?.name}</a>
                    </Link>
                </div>
            </div>

            <Link href={'/'}>
                <a className={styles.Content}>
                    <div className={styles.Background} style={
                        {
                            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(" + item.imageUrl + ")",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "50% 50%"
                        }
                    }>
                    </div>
                    <div className={styles.Title}>
                        {item.title}
                    </div>
                </a>
            </Link>
        </div>
    )
}

FlightOfferCard.defaultProps = {
    color: 'red'
}

export default FlightOfferCard