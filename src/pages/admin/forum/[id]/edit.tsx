import React from 'react'
import AdminLayout from "../../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../../hoc/withAdminAuth"

const AdminForumPostEditPage = () => {
    return (
        <AdminLayout title={'Muuda postitust'}>
            Admin Forum Edit
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminForumPostEditPage
