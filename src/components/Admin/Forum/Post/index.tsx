import styles from "./AdminForumPost.module.scss"
import React, {useEffect, useState} from "react";
import {getForumPostById} from "../../../../services/admin.service";
import {Content} from "../../../../types";
import {useRouter} from "next/router"
import LoadingSpinner2 from "../../../LoadingSpinner2"
import ForumPost from "../../../Forum/ForumPost";
import {AxiosResponse} from "axios";
import ForumPostComments from "../../../Forum/ForumPostComments";

type ForumResponse = {
    post: Content
    lastCommentId: number
    lastPage: number
}

const AdminForumPost = () => {
    const router = useRouter()
    const [post, setPost] = useState<Content>()
    const [loading, setLoading] = useState<boolean>(false)
    const [lastPage, setLastPage] = useState<number>(1)
    const page = Number(router.query?.page) || 1
    const {id} = router.query

    useEffect(() => {
        try {
            setLoading(true)
            const res = getForumPostById(Number(id), page).then((response: AxiosResponse<ForumResponse>) => {
                setPost(response.data.post)
                setLastPage(response.data.lastPage)
                setLoading(false)
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [page])

    if (loading || !post) {
        return (
            <div className={styles.Loading}>
                <LoadingSpinner2 />
            </div>
        )
    }

    return (
        <div className={styles.AdminForumPost}>
            <div className={styles.ForumPost}>
                <ForumPost {...post} />
            </div>
            <ForumPostComments
                post={post}
                comments={post.comments}
                currentPage={page}
                lastPage={lastPage} />
        </div>
    )
}

export default AdminForumPost