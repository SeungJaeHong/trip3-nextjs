import React, {useEffect, useState} from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../hoc/withAdminAuth"
import ContentMarketingPost from "../../../components/Admin/ContentMarketing/Post";
import styles from "./AdminContentMarketingPage.module.scss"
import Button from "../../../components/Button";
import {ContentMarketingPost as ContentMarketingPostType} from "../../../types";
import {getContentMarketingPosts, toggleActive} from "../../../services/admin.service";
import {useRouter} from "next/router";
import {useIsMounted} from "../../../hooks";
import {toast} from "react-toastify";

const AdminContentMarketingPage = () => {
    const router = useRouter()
    const [posts, setPosts] = useState<ContentMarketingPostType[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const page = router.query?.page || 1
    const isMounted = useIsMounted()

    useEffect(() => {
        try {
            setLoading(true)
            getContentMarketingPosts(Number(page)).then((response) => {
                if (isMounted()) {
                    setPosts(response.data.items)
                    setHasMore(response.data.hasMore)
                    setLoading(false)
                }
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [page])

    const onActiveChange = async (post: ContentMarketingPostType, checked: boolean) => {
        try {
            await toggleActive(post, checked).then((response) => {
                if (isMounted()) {
                    const post = response.data
                    const updatedItems = posts.map(el => el.id === post.id ? post : el)
                    setPosts(updatedItems)
                    toast.success('Salvestatud')
                }
            })
        } catch (e: any) {
            toast.error('Aktiveerimine ebaõnnestus')
        }
    }

    return (
        <AdminLayout>
            <div className={styles.Container}>
                <div className={styles.TitleContainer}>
                    <h1>Sisuturundus</h1>
                    <Button title={'Lisa uus'} className={styles.AddBtn} route={'/admin/content-marketing/add'}/>
                </div>
                <div className={styles.Content}>
                    {posts.map(post => {
                        return (
                            <div className={styles.Post} key={post.id}>
                                <ContentMarketingPost post={post} onActiveChange={onActiveChange} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminContentMarketingPage
