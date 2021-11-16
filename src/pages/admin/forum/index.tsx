import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import AdminForum from "../../../components/Admin/Forum"

const AdminForumPage = () => {
    return (
        <AdminLayout title={'Foorum'}>
            <AdminForum />
        </AdminLayout>
    )
}

export default AdminForumPage
