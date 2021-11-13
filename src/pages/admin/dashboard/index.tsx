import React from 'react'
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../../lib/ApiClientSSR"
import AdminLayout from "../../../layouts/AdminLayout";
import AdminDashboard from "../../../components/Admin/Dashboard";

const AdminDashboardPage = (props: any) => {
    return (
        <AdminLayout title={'Statistika'}>
            <AdminDashboard />
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const access = await ApiClientSSR(context).get('/admin')
        return {
            props: {}
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}

export default AdminDashboardPage
