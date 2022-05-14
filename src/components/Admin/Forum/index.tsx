import styles from './AdminForum.module.scss'
import { useEffect, useState } from 'react'
import { getForumPosts } from '../../../services/admin.service'
import ForumList from '../../Forum/ForumList'
import { ForumRowType } from '../../../types'
import SimplePaginator from '../../Paginator/SimplePaginator'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../LoadingSpinner'
import Button from '../../Button'

const AdminForum = () => {
    const router = useRouter()
    const [posts, setPosts] = useState<ForumRowType[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const page = router.query?.page || 1

    useEffect(() => {
        try {
            setLoading(true)
            getForumPosts(Number(page)).then((response) => {
                setPosts(response.data.items)
                setHasMore(response.data.hasMore)
                setLoading(false)
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [page])

    const getNextPageUrl = () => {
        if (hasMore) {
            return '/admin/forum?page=' + (Number(page) + 1)
        }

        return undefined
    }

    const getPreviousPageUrl = () => {
        if (Number(page) > 1) {
            return '/admin/forum?page=' + (Number(page) - 1)
        }

        return undefined
    }

    if (loading) {
        return (
            <div className={styles.Loading}>
                <LoadingSpinner />
            </div>
        )
    }

    return (
        <div className={styles.AdminForum}>
            <div className={styles.Content}>
                <div className={styles.ForumList}>
                    <ForumList items={posts} />
                </div>
                <div className={styles.NewButton}>
                    <Button title={'Lisa uus postitus'} route={'/admin/forum/add'} />
                </div>
            </div>
            <SimplePaginator nextPageUrl={getNextPageUrl()} previousPageUrl={getPreviousPageUrl()} />
        </div>
    )
}

export default AdminForum
