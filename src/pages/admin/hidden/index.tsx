import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../hoc/withAdminAuth"
import AdminHiddenContentTabs from "../../../components/Admin/HiddenContent/Tabs"
import {useRouter} from "next/router"
import styles from "./AdminHiddenContentPage.module.scss"
import AdminHiddenContentForum from "../../../components/Admin/HiddenContent/Forum"

const AdminHiddenContentPage = () => {
    const router = useRouter()
    const type = router.query?.type || 'forum'

    const renderComponent = () => {
        switch(type) {
            case 'forum': return <AdminHiddenContentForum />
            case 'flights': return <div>Flights</div>
            case 'news': return <div>News</div>
            case 'travelmates': return <div>Travelmates</div>
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
