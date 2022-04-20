import styles from './ForumLatest.module.scss'
import BlockTitle from '../../BlockTitle'
import { useEffect, useState } from 'react'
import MoreLink from '../../MoreLink'
import { ForumRowType } from '../../../types'
import { getLatestPosts } from '../../../services/forum.service'
import ForumList from '../ForumList'

type Props = {
    take: number
    excludeId?: number
}

const ForumLatest = ({ take, excludeId }: Props) => {
    const [forum, setForum] = useState<ForumRowType[]>([])

    useEffect(() => {
        getLatestPosts(take, excludeId).then((res) => {
            setForum(res.data)
        })
    }, [])

    return (
        <div className={styles.ForumLatest}>
            <BlockTitle title={'Foorum'} />
            <div className={styles.Content}>
                <ForumList items={forum} />
            </div>
            <div className={styles.ViewMore}>
                <MoreLink route={'/foorum/uldfoorum'} title={'Kõik postitused'} />
            </div>
        </div>
    )
}

ForumLatest.defaultProps = {
    take: 3,
}

export default ForumLatest
