import React, {useEffect, useState} from 'react'
import AdminLayout from "../../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../../hoc/withAdminAuth"
import AdminForumForm from "../../../../components/Admin/Forum/Form"
import {getForumPostById} from "../../../../services/admin.service";
import {useRouter} from "next/router";
import {Content} from "../../../../types";
import LoadingSpinner2 from "../../../../components/LoadingSpinner2";

const AdminForumPostEditPage = () => {
    const [post, setPost] = useState<Content>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        try {
            setLoading(true)
            const res = getForumPostById(Number(id)).then((response) => {
                setPost(response.data)
                setLoading(false)
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [])

    if (!post || loading) {
        return (
            <AdminLayout title={'Muuda postitust'}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <LoadingSpinner2 />
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout title={'Muuda postitust'}>
            <AdminForumForm post={post} />
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminForumPostEditPage
