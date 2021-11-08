import Link from 'next/link'
import styles from './ForumPost.module.scss'
import {Content, Destination, Topic} from "../../../types"
import UserAvatar from "../../User/UserAvatar"
import ThumbsUpIcon from "../../../icons/ThumbsUpIcon";
import clsx from "clsx";
import ThumbsDownIcon from "../../../icons/ThumbsDownIcon";
import Tag from "../../Tag";
import {useAppSelector} from "../../../hooks";
import {selectUser} from "../../../redux/auth";
import React, {useState} from "react";
import { useRouter } from 'next/router'
import {togglePostStatus} from "../../../services/forum.service"
import {toast} from "react-hot-toast"

const ForumPost = (item: Content) => {
    const [post, setPost] = useState<Content>(item)
    const user = useAppSelector(selectUser)
    const userIsAdmin = user && user.isAdmin
    const isPostOwner = user && user.id === item.user.id
    const router = useRouter()

    const onToggleStatus = () => {
        if (userIsAdmin) {
            const status = !post.status
            togglePostStatus(post, status).then(res => {
                setPost(res.data)
                toast.success(res.data.status === 1 ? 'Postitus avalikustatud' : 'Postitus peidetud')
            }).catch(err => {
                if (err.response?.status === 401 || err.response?.status === 419) {
                    toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                    router.reload()
                }
            })
        }
    }

    const renderActionButtons = () => {
        if (!user?.id) {
            return null
        }

        const editUrl = '/foorum/' + post.id + '/muuda'
        if (userIsAdmin) {
            return (
                <div className={styles.Buttons}>
                    <span className={styles.ActionButton} onClick={() => router.push(editUrl)}>Muuda</span> /
                    <span className={styles.ActionButton} onClick={onToggleStatus}>
                        {post.status === 1 ? 'Peida' : 'Avalikusta'}
                    </span>
                </div>
            )
        } else if (isPostOwner) {
            return (
                <div className={styles.Buttons}>
                    <span className={styles.ActionButton} onClick={() => router.push(editUrl)}>Muuda</span>
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div className={styles.ForumPost}>
            <div className={styles.Title}>
                {post.title}
            </div>
            <div className={styles.MetaData}>
                <Link href={'/'}>
                    <a className={styles.User}>{post.user.name}</a>
                </Link>
                <div className={styles.CreatedDate}>
                    {post.createdAt}
                </div>
                <div className={styles.UserAvatar}>
                    <UserAvatar user={post.user} />
                </div>
            </div>
            <div className={styles.Body} dangerouslySetInnerHTML={{ __html: post.body }} />
            <div className={styles.Actions}>
                {renderActionButtons()}
            </div>
            <div className={styles.BottomData}>
                <div className={styles.Tags}>
                    {post.destinations?.map((destination: Destination) => {
                        return <Tag title={destination.name} type={'destination'} route={'/sihtkoht/' + destination.slug} key={destination.id} />
                    })}
                    {post.topics?.map((topic: Topic) => {
                        return <Tag title={topic.name} route={'/'} key={topic.id} />
                    })}
                </div>
                <div className={styles.Thumbs}>
                    <div className={styles.Thumb}>
                        <ThumbsUpIcon />
                        <span className={styles.ThumbsCount}>{post.likes}</span>
                    </div>
                    <div className={clsx(styles.Thumb, styles.ThumbDown)}>
                        <ThumbsDownIcon />
                        <span className={styles.ThumbsCount}>{post.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumPost