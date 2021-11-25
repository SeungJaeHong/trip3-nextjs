import React, {useEffect, useState} from "react"
import styles from "./AdminHiddenContentTravelmates.module.scss"
import {useRouter} from "next/router"
import {TravelmateRowType} from "../../../../types"
import {getHiddenTravelmates} from "../../../../services/admin.service"
import LoadingSpinner2 from "../../../LoadingSpinner2"
import SimplePaginator from "../../../Paginator/SimplePaginator"
import TravelmateCard from "../../../Travelmate/TravelmateCard"

const AdminHiddenContentTravelmates = () => {
    const router = useRouter()
    const [travelmates, setTravelmates] = useState<TravelmateRowType[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const page = router.query?.page || 1

    useEffect(() => {
        try {
            setLoading(true)
            const res = getHiddenTravelmates(Number(page)).then((response) => {
                setTravelmates(response.data.items)
                setHasMore(response.data.hasMore)
                setLoading(false)
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [page])

    const getNextPageUrl = () => {
        if (hasMore) {
            return '/admin/hidden?type=travelmates&page=' + (Number(page) + 1)
        }

        return undefined
    }

    const getPreviousPageUrl = () => {
        if (Number(page) > 1) {
            return '/admin/hidden?type=travelmates&page=' + (Number(page) - 1)
        }

        return undefined
    }

    if (loading) {
        return (
            <div className={styles.Loading}>
                <LoadingSpinner2 />
            </div>
        )
    }

    return (
        <div className={styles.AdminHiddenContentTravelmates}>
            <div className={styles.Grid}>
                {travelmates?.map(item => {
                    return <TravelmateCard {...item} key={item.id} />
                })}
            </div>

            <div className={styles.Paginator}>
                <SimplePaginator
                    nextPageUrl={getNextPageUrl()}
                    previousPageUrl={getPreviousPageUrl()}
                />
            </div>
        </div>
    )
}

export default AdminHiddenContentTravelmates