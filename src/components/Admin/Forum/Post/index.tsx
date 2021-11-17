import styles from "./AdminForumPost.module.scss"
import {useEffect, useState} from "react";
import {getForumPostById} from "../../../../services/admin.service";
import {Content} from "../../../../types";
import {useRouter} from "next/router"
import LoadingSpinner2 from "../../../LoadingSpinner2"

const AdminForumPost = () => {
    const router = useRouter()
    const [post, setPost] = useState<Content>()
    const [loading, setLoading] = useState<boolean>(false)
    const page = router.query?.page || 1
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
    }, [page])

    if (loading) {
        return (
            <div className={styles.Loading}>
                <LoadingSpinner2 />
            </div>
        )
    }

    return (
        <div className={styles.AdminForumPost}>
            ASDF
        </div>
    )
}

export default AdminForumPost