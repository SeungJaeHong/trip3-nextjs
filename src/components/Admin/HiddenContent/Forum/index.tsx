import React, {useEffect, useState} from "react"
import styles from "./AdminHiddenContentForum.module.scss"
import {useRouter} from "next/router"
import {ForumRowHiddenType} from "../../../../types"
import {getHiddenForumPosts} from "../../../../services/admin.service"
import LoadingSpinner2 from "../../../LoadingSpinner2"
import AdminHiddenContentForumRow from "../ForumRow";

const AdminHiddenContentForum = () => {
    const router = useRouter()
    const [posts, setPosts] = useState<ForumRowHiddenType[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const page = router.query?.page || 1

    useEffect(() => {
        try {
            setLoading(true)
            const res = getHiddenForumPosts(Number(page)).then((response) => {
                setPosts(response.data.items)
                setHasMore(response.data.hasMore)
                setLoading(false)

                //console.log(response.data)
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [page])

    if (loading) {
        return (
            <div className={styles.Loading}>
                <LoadingSpinner2 />
            </div>
        )
    }

    return (
        <div className={styles.AdminHiddenContentForum}>
            {posts.map(post => {
                return (
                    <div className={styles.ForumRow} key={post.id}>
                        <AdminHiddenContentForumRow {...post} />
                    </div>
                )
            })}
        </div>
    )
}

export default AdminHiddenContentForum