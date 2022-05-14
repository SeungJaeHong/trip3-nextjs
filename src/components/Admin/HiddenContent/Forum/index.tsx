import React, { useEffect, useState } from 'react'
import styles from './AdminHiddenContentForum.module.scss'
import { useRouter } from 'next/router'
import { ForumRowHiddenType } from '../../../../types'
import { getHiddenForumPosts } from '../../../../services/admin.service'
import LoadingSpinner from '../../../LoadingSpinner'
import AdminHiddenContentForumRow from '../ForumRow'
import SimplePaginator from '../../../Paginator/SimplePaginator'

const AdminHiddenContentForum = () => {
    const router = useRouter()
    const [posts, setPosts] = useState<ForumRowHiddenType[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const page = router.query?.page || 1

    useEffect(() => {
        try {
            setLoading(true)
            const res = getHiddenForumPosts(Number(page)).then((response) => {
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
            return '/admin/hidden?page=' + (Number(page) + 1)
        }

        return undefined
    }

    const getPreviousPageUrl = () => {
        if (Number(page) > 1) {
            return '/admin/hidden?page=' + (Number(page) - 1)
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
        <div className={styles.AdminHiddenContentForum}>
            {posts.map((post) => {
                return (
                    <div className={styles.ForumRow} key={post.id}>
                        <AdminHiddenContentForumRow {...post} />
                    </div>
                )
            })}
            <div className={styles.Paginator}>
                <SimplePaginator nextPageUrl={getNextPageUrl()} previousPageUrl={getPreviousPageUrl()} />
            </div>
        </div>
    )
}

export default AdminHiddenContentForum
