import Link from 'next/link'
import styles from './FlightOfferRow.module.scss'
import TicketsIcon from "../../../icons/TicketsIcon"
import {Destination, FlightOfferRowType} from "../../../types"
import Tag from "../../Tag"

const FlightOfferRow = (item: FlightOfferRowType) => {
    return (
        <div className={styles.FlightOfferRow}>
            <div className={styles.Icon}>
                <TicketsIcon />
            </div>
            <div className={styles.Content}>
                <Link href={'/odavad-lennupiletid/' + item.slug}>
                    <a className={styles.Title}>{item.title}</a>
                </Link>
                <div className={styles.Meta}>
                    <span className={styles.CreatedDate}>{item.createdAt}</span>
                    <div className={styles.Tags}>
                        {item.destinations?.map((destination: Destination) => {
                            return <Tag title={destination.name} type={'destination'} route={'/'} key={destination.id} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightOfferRow