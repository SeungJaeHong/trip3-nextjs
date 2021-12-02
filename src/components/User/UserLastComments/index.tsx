import styles from "./UserLastComments.module.scss"
import {useEffect, useState} from "react";
import {getLastComments} from "../../../services/user.service";
import {UserComment, UserPublicProfile} from "../../../types";
import LoadingSpinner2 from "../../LoadingSpinner2"
import ForumComment from "../../Forum/ForumComment";
import Link from 'next/link'

const UserLastComments = (user: UserPublicProfile) => {
    const [comments, setComments] = useState<UserComment[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        try {
            setLoading(true)
            const res = getLastComments(user.id).then((response) => {
                setComments(response.data)
                setLoading(false)
            })
        } catch (e: any) {
            setLoading(false)
        }
    }, [])

    if (loading) {
        return (
            <div className={styles.Loading}>
                <LoadingSpinner2 />
            </div>
        )
    }

    return (
        <div className={styles.UserLastComments}>
            {comments?.map(comment => {
                return (
                    <div className={styles.ForumRow} key={comment.id}>
                        <div className={styles.PostTitle}>
                            <Link href={comment.forumPost.url}>
                                <a>
                                    {comment.forumPost.title}
                                </a>
                            </Link>
                        </div>
                        <ForumComment item={comment} />
                    </div>
                )
            })}
        </div>
    )
}

export default UserLastComments