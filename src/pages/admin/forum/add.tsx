import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../hoc/withAdminAuth"
import AdminForumForm from "../../../components/Admin/Forum/Form";

const AdminForumPostAddPage = () => {
    return (
        <AdminLayout title={'Lisa uus postitus'}>
            <AdminForumForm />
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminForumPostAddPage
