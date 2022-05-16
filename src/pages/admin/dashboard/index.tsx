import React from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import AdminDashboard from '../../../components/Admin/Dashboard'
import { withAdminAuth } from '../../../hoc/withAdminAuth'

const AdminDashboardPage = () => {
    return (
        <AdminLayout title={'Statistika'}>
            <AdminDashboard />
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminDashboardPage
