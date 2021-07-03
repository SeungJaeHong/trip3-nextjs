import styles from './TravelmatesLatest.module.scss'
import BlockTitle from "../../BlockTitle"
import {useEffect, useState} from "react"
import {getLatestTravelmates} from "../../../api/travelmates"
import MoreLink from "../../MoreLink"
import TravelmateList from "../TravelmateList";

const TravelmatesLatest = () => {
    const [travelmates, setTravelmates] = useState([]);

    useEffect(() => {
        const getTravelmates = async () => {
            const result = await getLatestTravelmates()
            setTravelmates(result.data.travelmates);
        }

        getTravelmates()
    }, [])

    return (
        <div className={styles.TravelmatesLatest}>
            <BlockTitle title={'Reisikaaslased'} route={'/'} />
            <div className={styles.Content}>
                <TravelmateList items={travelmates} />
            </div>
            <div className={styles.ViewMore}>
                <MoreLink route={'/'} title={'Kõik reisikaaslased'} />
            </div>
        </div>
    )
}

export default TravelmatesLatest