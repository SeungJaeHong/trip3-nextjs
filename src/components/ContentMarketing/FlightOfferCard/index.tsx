import Link from 'next/link'
import type {ContentMarketingPost} from '../../../types'
import styles from './ContentMarketingFlightOfferCard.module.scss'

const ContentMarketingFlightOfferCard = (item: ContentMarketingPost) => {
    return (
        <div className={styles.FlightOfferCard}>
            <div className={styles.DestinationContainer} style={{'backgroundColor': '#FF5050'}}>
                <div className={styles.Destination}>
                    <Link href={'/sisuturundus/' + item.slug}>
                        <a>{item.clientName}</a>
                    </Link>
                </div>
                <div className={styles.ParentDestination}>
                    <Link href={'/sisuturundus/' + item.slug}>
                        <a>Sisuturundus</a>
                    </Link>
                </div>
            </div>

            <Link href={'/sisuturundus/' + item.slug}>
                <a className={styles.Content}>
                    <div className={styles.Background} style={
                        {
                            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + item.backgroundImageUrl + ")",
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

export default ContentMarketingFlightOfferCard