import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../hoc/withAdminAuth"
import AdminHiddenContentTabs from "../../../components/Admin/HiddenContent/Tabs"
import {useRouter} from "next/router"
import styles from "./AdminHiddenContentPage.module.scss"
import AdminHiddenContentForum from "../../../components/Admin/HiddenContent/Forum"
import AdminHiddenContentFlights from "../../../components/Admin/HiddenContent/Flights"
import AdminHiddenContentNews from "../../../components/Admin/HiddenContent/News"
import AdminHiddenContentTravelmates from "../../../components/Admin/HiddenContent/Travelmates"

const AdminHiddenContentPage = () => {
    const router = useRouter()
    const type = router.query?.type || 'forum'

    const renderComponent = () => {
        switch(type) {
            case 'forum': return <AdminHiddenContentForum />
            case 'flights': return <AdminHiddenContentFlights />
            case 'news': return <AdminHiddenContentNews />
            case 'travelmates': return <AdminHiddenContentTravelmates />
            default: return null
        }
    }

    return (
        <AdminLayout title={'Peidetud sisu'}>
            <div className={styles.Tabs}>
                <AdminHiddenContentTabs />
            </div>
            <div className={styles.Content}>
                {renderComponent()}
            </div>
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminHiddenContentPage
