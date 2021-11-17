import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import AdminForum from "../../../components/Admin/Forum"
import {withAdminAuth} from "../../../hoc/withAdminAuth"

const AdminForumPage = () => {
    return (
        <AdminLayout title={'Foorum'}>
            <AdminForum />
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminForumPage
