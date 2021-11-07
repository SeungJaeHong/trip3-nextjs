import Link from 'next/link'
import styles from './ForumPost.module.scss'
import {Content, Destination, Topic} from "../../../types"
import UserAvatar from "../../User/UserAvatar"
import ThumbsUpIcon from "../../../icons/ThumbsUpIcon";
import clsx from "clsx";
import ThumbsDownIcon from "../../../icons/ThumbsDownIcon";
import Tag from "../../Tag";

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
                    <UserAvatar user={item.user} />
                </div>
            </div>
            <div className={styles.Body} dangerouslySetInnerHTML={{ __html: item.body }} />
            <div className={styles.Actions}>
                <div className={styles.Buttons}>
                    <span className={styles.ActionButton}>Muuda</span>/
                    <span className={styles.ActionButton}>Peida</span>
                </div>
            </div>
            <div className={styles.BottomData}>
                <div className={styles.Tags}>
                    {item.destinations?.map((destination: Destination) => {
                        return <Tag title={destination.name} type={'destination'} route={'/sihtkoht/' + destination.slug} key={destination.id} />
                    })}
                    {item.topics?.map((topic: Topic) => {
                        return <Tag title={topic.name} route={'/'} key={topic.id} />
                    })}
                </div>
                <div className={styles.Thumbs}>
                    <div className={styles.Thumb}>
                        <ThumbsUpIcon />
                        <span className={styles.ThumbsCount}>{item.likes}</span>
                    </div>
                    <div className={clsx(styles.Thumb, styles.ThumbDown)}>
                        <ThumbsDownIcon />
                        <span className={styles.ThumbsCount}>{item.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumPost