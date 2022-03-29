import styles from './FrontPageSearchResults.module.scss'
import PinIcon from '../../../icons/PinIcon'
import TicketsIcon from '../../../icons/TicketsIcon'
import CommentIcon from '../../../icons/CommentIcon'
import ArrowRightIcon from '../../../icons/ArrowRightIcon'
import {
    DestinationSearchResult,
    FrontPageFlightSearchResult,
    FrontPageForumSearchResult,
} from '../../../services/search.service'
import { useRouter } from 'next/router'
import { getForumUrlByTypeAndSlug } from '../../../helpers'

type Props = {
    destinations?: DestinationSearchResult[]
    flights?: FrontPageFlightSearchResult[]
    forum?: FrontPageForumSearchResult[]
    total?: number
}

const FrontPageSearchResults = ({ destinations, flights, forum, total }: Props) => {
    const router = useRouter()

    if (total === 0) {
        return (
            <div className={styles.FrontPageSearchResults}>
                <div className={styles.NoResults}>Tulemusi ei leitud</div>
            </div>
        )
    }

    return (
        <div className={styles.FrontPageSearchResults}>
            {destinations && destinations?.length > 0 && (
                <div className={styles.ResultBlock}>
                    <PinIcon />
                    <div className={styles.Results}>
                        <div className={styles.CategoryTitle}>Sihtkohad</div>
                        <div className={styles.ResultList}>
                            {destinations.map((destination) => {
                                const destinationName = destination.parent_name
                                    ? destination.name + ', ' + destination.parent_name
                                    : destination.name
                                return (
                                    <div
                                        className={styles.ResultRow}
                                        onClick={() => router.push('/sihtkoht/' + destination.slug)}
                                        key={destination.id}
                                    >
                                        {destinationName}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            {flights && flights?.length > 0 && (
                <div className={styles.ResultBlock}>
                    <TicketsIcon />
                    <div className={styles.Results}>
                        <div className={styles.CategoryTitle}>Lennupakkumised</div>
                        <div className={styles.ResultList}>
                            {flights.map((flight) => {
                                return (
                                    <div
                                        className={styles.ResultRow}
                                        onClick={() => router.push('/odavad-lennupiletid/' + flight.slug)}
                                        key={flight.id}
                                    >
                                        {flight.title}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            {forum && forum?.length > 0 && (
                <div className={styles.ResultBlock}>
                    <CommentIcon />
                    <div className={styles.Results}>
                        <div className={styles.CategoryTitle}>Foorum</div>
                        <div className={styles.ResultList}>
                            {forum.map((forumRow) => {
                                const forumUrl = getForumUrlByTypeAndSlug(forumRow.type, forumRow.slug)
                                return (
                                    <div
                                        className={styles.ResultRow}
                                        onClick={() => router.push(forumUrl)}
                                        key={forumRow.id}
                                    >
                                        {forumRow.title}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            {total && total > 0 && (
                <div className={styles.MoreResults}>
                    <span>Kõik tulemused ({total})</span>
                    <ArrowRightIcon />
                </div>
            )}
        </div>
    )
}

export default FrontPageSearchResults
