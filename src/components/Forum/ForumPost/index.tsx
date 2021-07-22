import Link from 'next/link'
import styles from './ForumPost.module.scss'
import {Content} from "../../../types"
import UserAvatar from "../../User/UserAvatar";

const ForumPost = (item: Content) => {
    return (
        <div className={styles.ForumPost}>
            <div className={styles.Title}>
                {item.title}
            </div>
            <div className={styles.MetaData}>
                <Link href={'/'}>
                    <a className={styles.User}>{item.user.name}</a>
                </Link>
                <div className={styles.CreatedDate}>
                    {item.createdAt}
                </div>
                <div className={styles.UserAvatar}>
                    <UserAvatar {...item.user} />
                </div>
            </div>
            <div className={styles.Body}>
                {item.body}
            </div>
        </div>
    )
}

export default ForumPost