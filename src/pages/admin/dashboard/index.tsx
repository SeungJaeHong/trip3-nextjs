import React from 'react'
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../../lib/ApiClientSSR"
import AdminLayout from "../../../layouts/AdminLayout";

const AdminDashboard = (props: any) => {
    return (
        <AdminLayout>
            <div>
                Dashboard Component
            </div>
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

export default AdminDashboard
