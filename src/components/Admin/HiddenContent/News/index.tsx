import React, { useEffect, useState } from 'react'
import styles from './AdminHiddenContentNews.module.scss'
import { useRouter } from 'next/router'
import { NewsCardType } from '../../../../types'
import { getHiddenNews } from '../../../../services/admin.service'
import LoadingSpinner from '../../../LoadingSpinner'
import SimplePaginator from '../../../Paginator/SimplePaginator'
import NewsRow from '../../../News/NewsRow'

const AdminHiddenContentNews = () => {
    const router = useRouter()
    const [news, setNews] = useState<NewsCardType[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const page = router.query?.page || 1

    useEffect(() => {
        try {
            setLoading(true)
            const res = getHiddenNews(Number(page)).then((response) => {
                setNews(response.data.items)
                setHasMore(response.data.hasMore)
                setLoading(false)
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [page])

    const getNextPageUrl = () => {
        if (hasMore) {
            return '/admin/hidden?type=news&page=' + (Number(page) + 1)
        }

        return undefined
    }

    const getPreviousPageUrl = () => {
        if (Number(page) > 1) {
            return '/admin/hidden?type=news&page=' + (Number(page) - 1)
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
        <div className={styles.AdminHiddenContentNews}>
            {news?.map((item) => {
                return (
                    <div className={styles.NewsRow} key={item.id}>
                        <NewsRow {...item} />
                    </div>
                )
            })}

            <div className={styles.Paginator}>
                <SimplePaginator nextPageUrl={getNextPageUrl()} previousPageUrl={getPreviousPageUrl()} />
            </div>
        </div>
    )
}

export default AdminHiddenContentNews
