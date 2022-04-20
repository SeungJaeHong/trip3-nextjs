import styles from './TravelmatesLatest.module.scss'
import BlockTitle from '../../BlockTitle'
import { useEffect, useState } from 'react'
import MoreLink from '../../MoreLink'
import TravelmateList from '../TravelmateList'
import { getLatestTravelmates } from '../../../services/travelmate.service'
import { TravelmateRowType } from '../../../types'
import SkeletonLoader from '../../SkeletonLoader'
import TravelmateRow from '../TravelmateRow'
import clsx from 'clsx'

type Props = {
    grid: boolean
}

const TravelmatesLatest = ({ grid }: Props) => {
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
            if (grid) {
                return (
                    <div className={styles.Grid}>
                        {travelmates.map((item: TravelmateRowType) => {
                            return <TravelmateRow {...item} key={item.id} />
                        })}
                    </div>
                )
            } else {
                return <TravelmateList items={travelmates} />
            }
        }
    }

    return (
        <div className={styles.TravelmatesLatest}>
            <BlockTitle title={'Reisikaaslased'} />
            <div
                className={clsx(styles.Content, {
                    [styles.WithGrid]: grid,
                })}
            >
                {renderContent()}
            </div>
            {!loading && (
                <div className={styles.ViewMore}>
                    <MoreLink route={'/reisikaaslased'} title={'Kõik reisikaaslased'} />
                </div>
            )}
        </div>
    )
}

TravelmatesLatest.defaultProps = {
    grid: false,
}

export default TravelmatesLatest
