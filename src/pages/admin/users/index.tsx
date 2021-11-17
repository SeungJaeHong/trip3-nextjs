import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../hoc/withAdminAuth"

const AdminUsersPage = () => {
    return (
        <AdminLayout title={'Kasutajad'}>
            <div>
                Users
            </div>
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminUsersPage
