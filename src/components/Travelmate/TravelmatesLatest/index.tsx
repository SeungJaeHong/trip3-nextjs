import styles from './TravelmatesLatest.module.scss'
import BlockTitle from '../../BlockTitle'
import { useEffect, useState } from 'react'
import MoreLink from '../../MoreLink'
import TravelmateList from '../TravelmateList'
import { getLatestTravelmates } from '../../../services/travelmate.service'
import { TravelmateRowType } from '../../../types'
import SkeletonLoader from '../../SkeletonLoader'

const TravelmatesLatest = () => {
    const [travelmates, setTravelmates] = useState<TravelmateRowType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getLatestTravelmates()
            .then((res) => {
                setTravelmates(res.data)
            })
            .finally(() => setLoading(false))
    }, [])

    const renderContent = () => {
        if (loading) {
            return <SkeletonLoader />
        } else {
            return <TravelmateList items={travelmates} />
        }
    }

    return (
        <div className={styles.TravelmatesLatest}>
            <BlockTitle title={'Reisikaaslased'} />
            <div className={styles.Content}>{renderContent()}</div>
            {!loading && (
                <div className={styles.ViewMore}>
                    <MoreLink route={'/reisikaaslased'} title={'Kõik reisikaaslased'} />
                </div>
            )}
        </div>
    )
}

export default TravelmatesLatest
