import styles from "./AdminForum.module.scss"
import {useEffect, useState} from "react";
import {getForumPosts} from "../../../services/admin.service";
import ForumList from "../../Forum/ForumList";
import {ForumRowType} from "../../../types";

const AdminForum = () => {
    const [posts, setPosts] = useState<ForumRowType[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false)

    useEffect(() => {
        try {
            const res = getForumPosts().then((response) => {
                setPosts(response.data.items)
                setHasMore(response.data.hasMore)
            })
        } catch (e: any) {}
    }, [])

    return (
        <div className={styles.AdminForum}>
            <ForumList items={posts} />
        </div>
    )
}

export default AdminForum