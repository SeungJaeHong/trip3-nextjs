import styles from './TravelmateList.module.scss'
import {TravelmateRowType} from "../../../types"
import TravelmateRow from "../TravelmateRow"

const TravelmateList = (props: {items: TravelmateRowType[]}) => {
    return (
        <div className={styles.TravelmateList}>
            {props.items.map((item: TravelmateRowType) => {
                return (
                    <div className={styles.TravelmateRow} key={item.id}>
                        <TravelmateRow {...item} />
                    </div>
                )
            })}
        </div>
    )
}

export default TravelmateList