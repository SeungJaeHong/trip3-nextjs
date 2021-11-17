import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../hoc/withAdminAuth"

const AdminForumPostAddPage = () => {
    return (
        <AdminLayout title={'Lisa uus postitus'}>
            Admin Forum add
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminForumPostAddPage
