import Link from 'next/link'
import styles from './ForumPost.module.scss'
import {Content} from "../../../types"
import UserAvatar from "../../User/UserAvatar"
import ReactMarkdown from 'react-markdown'
import {render} from 'react-dom'


const ForumPost = (item: Content) => {

    const text = '# Hello, MDX I 3 Markdown and JSX'


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
                <ReactMarkdown>{item.body}</ReactMarkdown>
            </div>
        </div>
    )
}

export default ForumPost