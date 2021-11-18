import React from 'react'
import AdminLayout from "../../../../layouts/AdminLayout"
import AdminForumPost from "../../../../components/Admin/Forum/Post";
import {withAdminAuth} from "../../../../hoc/withAdminAuth"

const AdminForumPostPage = () => {
    return (
        <AdminLayout >
            <AdminForumPost />
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminForumPostPage
