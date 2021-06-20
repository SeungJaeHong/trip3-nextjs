import Link from 'next/link'
import styles from './FlightOfferRow.module.scss'
import TicketsIcon from "../../../icons/TicketsIcon";

type Props = {
    title: string
    //data: any
}

const FlightOfferRow = (props: Props) => {
    return (
        <div className={styles.FlightOfferRow}>
            <div className={styles.Icon}>
                <TicketsIcon />
            </div>
            <div className={styles.Content}>
                <Link href={'/'}>
                    <a className={styles.Title}>{props.title}</a>
                </Link>
                <div className={styles.Meta}>
                    <span className={styles.MetaItem}>Täna 23:31</span>
                    <span className={styles.MetaItem}>Hispaania</span>
                </div>
            </div>
        </div>
    )
}

export default FlightOfferRow