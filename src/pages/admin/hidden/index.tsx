import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../hoc/withAdminAuth"

const AdminHiddenContentPage = () => {
    return (
        <AdminLayout title={'Peidetud sisu'}>
            <div>
                Hidden content
            </div>
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminHiddenContentPage
