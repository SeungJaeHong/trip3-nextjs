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
import { useIsMounted } from '../../../hooks'

type Props = {
    grid: boolean
    take: number
    destinationId?: number
}

const TravelmatesLatest = ({ grid, take, destinationId }: Props) => {
    const [travelmates, setTravelmates] = useState<TravelmateRowType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const isMounted = useIsMounted()

    useEffect(() => {
        getLatestTravelmates(take, destinationId)
            .then((res) => {
                if (isMounted()) {
                    setTravelmates(res.data)
                }
            })
            .catch((e) => {})
            .finally(() => {
                if (isMounted()) {
                    setLoading(false)
                }
            })
    }, [destinationId])

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
    take: 3,
}

export default TravelmatesLatest
