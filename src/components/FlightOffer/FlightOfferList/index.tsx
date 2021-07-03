import styles from './FlightOfferList.module.scss'
import {FlightOfferRowType} from "../../../types"
import FlightOfferRow from "../FlightOfferRow"

const FlightOfferList = (props: {items: FlightOfferRowType[]}) => {
    return (
        <div className={styles.FlightOfferList}>
            {props.items.map((item: FlightOfferRowType) => {
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