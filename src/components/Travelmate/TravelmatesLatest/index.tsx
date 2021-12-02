import styles from './TravelmatesLatest.module.scss'
import BlockTitle from "../../BlockTitle"
import {useEffect, useState} from "react"
import MoreLink from "../../MoreLink"
import TravelmateList from "../TravelmateList"
import {getLatestTravelmates} from "../../../services/travelmate.service"
import {TravelmateRowType} from "../../../types"

const TravelmatesLatest = () => {
    const [travelmates, setTravelmates] = useState<TravelmateRowType[]>([])

    useEffect(() => {
        const getTravelmates = async () => {
            const result = await getLatestTravelmates()
            setTravelmates(result.data)
        }

        getTravelmates()
    }, [])

    return (
        <div className={styles.TravelmatesLatest}>
            <BlockTitle title={'Reisikaaslased'} />
            <div className={styles.Content}>
                <TravelmateList items={travelmates} />
            </div>
            <div className={styles.ViewMore}>
                <MoreLink route={'/reisikaaslased'} title={'Kõik reisikaaslased'} />
            </div>
        </div>
    )
}

export default TravelmatesLatest