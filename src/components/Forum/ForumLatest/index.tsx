import styles from './ForumLatest.module.scss'
import BlockTitle from '../../BlockTitle'
import { useEffect, useState } from 'react'
import MoreLink from '../../MoreLink'
import { ForumRowType } from '../../../types'
import { getLatestPosts } from '../../../services/forum.service'
import ForumList from '../ForumList'
import SkeletonLoader from '../../SkeletonLoader'
import { useIsMounted } from '../../../hooks'

type Props = {
    take: number
    excludeId?: number
}

const ForumLatest = ({ take, excludeId }: Props) => {
    const [forum, setForum] = useState<ForumRowType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const isMounted = useIsMounted()

    useEffect(() => {
        getLatestPosts(take, excludeId)
            .then((res) => {
                if (isMounted()) {
                    setForum(res.data)
                }
            })
            .finally(() => {
                if (isMounted()) {
                    setLoading(false)
                }
            })
    }, [])

    const renderContent = () => {
        if (loading) {
            return <SkeletonLoader />
        } else {
            return <ForumList items={forum} />
        }
    }

    return (
        <div className={styles.ForumLatest}>
            <BlockTitle title={'Foorum'} />
            <div className={styles.Content}>{renderContent()}</div>
            {!loading && (
                <div className={styles.ViewMore}>
                    <MoreLink route={'/foorum/uldfoorum'} title={'Kõik postitused'} />
                </div>
            )}
        </div>
    )
}

ForumLatest.defaultProps = {
    take: 3,
}

export default ForumLatest
