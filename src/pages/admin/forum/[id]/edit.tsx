import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../layouts/AdminLayout'
import { withAdminAuth } from '../../../../hoc/withAdminAuth'
import AdminForumForm from '../../../../components/Admin/Forum/Form'
import { getForumPostById } from '../../../../services/admin.service'
import { useRouter } from 'next/router'
import { ForumPostType } from '../../../../types'
import LoadingSpinner from '../../../../components/LoadingSpinner'
import styles from '../../../../layouts/AdminLayout/AdminLayout.module.scss'

const AdminForumPostEditPage = () => {
    const [post, setPost] = useState<ForumPostType>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        try {
            setLoading(true)
            getForumPostById(Number(id)).then((response) => {
                setPost(response.data)
                setLoading(false)
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [id])

    if (!post || loading) {
        return (
            <AdminLayout title={'Muuda postitust'}>
                <div className={styles.Loading}>
                    <LoadingSpinner />
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
