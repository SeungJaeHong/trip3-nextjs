import styles from './FlightOfferList.module.scss'
import {FlightOfferRowType} from "../../../types"
import FlightOfferRow from "../FlightOfferRow"

type Props = {
    items: FlightOfferRowType[]
}

const FlightOfferList = ({items}: Props) => {
    return (
        <div className={styles.FlightOfferList}>
            {items.map((item: FlightOfferRowType) => {
                return (
                    <div className={styles.FlightOfferRow} key={item.id}>
                        <FlightOfferRow {...item} />
                    </div>
                )
            })}
        </div>
    )
}

export default FlightOfferList