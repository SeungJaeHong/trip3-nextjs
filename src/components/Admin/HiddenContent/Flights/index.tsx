import React, {useEffect, useState} from "react"
import styles from "./AdminHiddenContentFlights.module.scss"
import {useRouter} from "next/router"
import {FlightOfferRowType} from "../../../../types"
import {getHiddenFlights} from "../../../../services/admin.service"
import LoadingSpinner2 from "../../../LoadingSpinner2"
import SimplePaginator from "../../../Paginator/SimplePaginator"
import FlightOfferList from "../../../FlightOffer/FlightOfferList"

const AdminHiddenContentFlights = () => {
    const router = useRouter()
    const [flights, setFlights] = useState<FlightOfferRowType[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const page = router.query?.page || 1

    useEffect(() => {
        try {
            setLoading(true)
            const res = getHiddenFlights(Number(page)).then((response) => {
                setFlights(response.data.items)
                setHasMore(response.data.hasMore)
                setLoading(false)
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [page])

    const getNextPageUrl = () => {
        if (hasMore) {
            return '/admin/hidden?type=flights&page=' + (Number(page) + 1)
        }

        return undefined
    }

    const getPreviousPageUrl = () => {
        if (Number(page) > 1) {
            return '/admin/hidden?type=flights&page=' + (Number(page) - 1)
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
        <div className={styles.AdminHiddenContentFlights}>
            <FlightOfferList items={flights} />
            <div className={styles.Paginator}>
                <SimplePaginator
                    nextPageUrl={getNextPageUrl()}
                    previousPageUrl={getPreviousPageUrl()}
                />
            </div>
        </div>
    )
}

export default AdminHiddenContentFlights