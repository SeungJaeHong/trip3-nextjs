import React from 'react'
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../../lib/ApiClientSSR"
import AdminLayout from "../../../layouts/AdminLayout"

const AdminUsersPage = (props: any) => {
    return (
        <AdminLayout title={'Kasutajad'}>
            <div>
                Users
            </div>
        </AdminLayout>
    )
}

export default AdminUsersPage
