import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout";
import AdminDashboard from "../../../components/Admin/Dashboard";

const AdminDashboardPage = () => {
    return (
        <AdminLayout title={'Statistika'}>
            <AdminDashboard />
        </AdminLayout>
    )
}

export default AdminDashboardPage
