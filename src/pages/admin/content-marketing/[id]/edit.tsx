import AdminLayout from "../../../../layouts/AdminLayout";
import React, {useEffect, useState} from "react";
import AdminContentMarketingForm from "../../../../components/Admin/ContentMarketing/Form";
import {ContentMarketingFullPost} from "../../../../types";
import {useRouter} from "next/router";
import {getContentMarketingPostById} from "../../../../services/admin.service";
import styles from "../../../../layouts/AdminLayout/AdminLayout.module.scss";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import {useIsMounted} from "../../../../hooks";

const AdminContentMarketingEditPage = () => {
    const [post, setPost] = useState<ContentMarketingFullPost>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const { id } = router.query
    const isMounted = useIsMounted()

    useEffect(() => {
        if (id) {
            try {
                setLoading(true)
                getContentMarketingPostById(Number(id)).then((response) => {
                    if (isMounted()) {
                        setPost(response.data)
                        setLoading(false)
                    }
                })
            } catch (e: any) {
                setLoading(false)
            }
        }
    }, [id])

    //console.log(post)

    if (!post || loading) {
        return (
            <AdminLayout title={'Muuda postitust'}>
                <div className={styles.Loading}>
                    <LoadingSpinner />
                </div>
            </AdminLayout>
        )
    }

    const renderContent = () => {
        if (!post || loading) {
            return (
                <div className={styles.Loading}>
                    <LoadingSpinner />
                </div>
            )
        } else {
            return <AdminContentMarketingForm item={post} />
        }
    }

    return (
        <AdminLayout title={'Muuda'}>
            {renderContent()}
        </AdminLayout>
    )
}

export default AdminContentMarketingEditPage