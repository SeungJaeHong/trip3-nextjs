import Link from 'next/link'
import styles from './ForumPost.module.scss'
import {Destination, ForumPostType, Topic} from '../../../types'
import UserAvatar from '../../User/UserAvatar'
import ThumbsUpIcon from '../../../icons/ThumbsUpIcon'
import clsx from 'clsx'
import ThumbsDownIcon from '../../../icons/ThumbsDownIcon'
import Tag from '../../Tag'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { togglePostStatus, likePost } from '../../../services/forum.service'
import { toast } from 'react-toastify'
import Alert from '../../Alert'
import useUser from '../../../hooks'

type Props = {
    item: ForumPostType
    showBreadCrumbs: boolean
}

const ForumPost = ({item, showBreadCrumbs}: Props) => {
    const [post, setPost] = useState<ForumPostType>(item)
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const isPostOwner = item.user.id === user?.id
    const router = useRouter()

    const onThumbsClick = (value: boolean) => {
        if (userIsLoggedIn) {
            likePost(post, value)
                .then((res) => {
                    setPost(res.data)
                })
                .catch((err) => {})
        }
    }

    const onToggleStatus = () => {
        if (userIsAdmin) {
            const status = !post.status
            togglePostStatus(post, status)
                .then((res) => {
                    const newPost = {...post, status: res.data}
                    setPost(newPost)
                    toast.success(newPost.status === 1 ? 'Postitus avalikustatud' : 'Postitus peidetud')
                })
                .catch((err) => {
                    if (err.response?.status === 401 || err.response?.status === 419) {
                        toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                        router.reload()
                    }
                })
        }
    }

    const renderActionButtons = () => {
        if (!user) {
            return null
        }

        let editUrl = '/foorum/' + post.id + '/muuda'
        if (userIsAdmin) {
            if (post.type === 'internal') {
                editUrl = '/admin/forum/' + post.id + '/edit'
            }
            return (
                <div className={styles.Buttons}>
                    <span className={styles.ActionButton} onClick={() => router.push(editUrl)}>
                        Muuda
                    </span>{' '}
                    /
                    <span className={styles.ActionButton} onClick={onToggleStatus}>
                        {post.status === 1 ? 'Peida' : 'Avalikusta'}
                    </span>
                </div>
            )
        } else if (isPostOwner) {
            return (
                <div className={styles.Buttons}>
                    <span className={styles.ActionButton} onClick={() => router.push(editUrl)}>
                        Muuda
                    </span>
                </div>
            )
        } else {
            return null
        }
    }

    return (
        <div className={styles.ForumPost}>
            {post.status === 0 && (
                <div className={styles.Alert}>
                    <Alert title={'Postitus ei ole avalikustatud!'} type={'warning'} />
                </div>
            )}
            <div className={styles.Title}>{post.title}</div>
            <div className={styles.MetaData}>
                <Link href={'/user/' + post.user.id}>
                    <a className={styles.User}>{post.user.name}</a>
                </Link>
                <div className={styles.CreatedDate}>{post.createdAt}</div>
                <div className={styles.UserAvatar}>
                    <UserAvatar user={post.user} />
                </div>
            </div>
            <div className={styles.Body} dangerouslySetInnerHTML={{ __html: post.body }} />
            <div className={styles.Actions}>{renderActionButtons()}</div>
            <div className={styles.BottomData}>
                <div className={styles.Tags}>
                    {post.destinations?.map((destination: Destination) => {
                        return (
                            <Tag
                                title={destination.name}
                                type={'destination'}
                                route={'/sihtkoht/' + destination.slug}
                                key={destination.id}
                            />
                        )
                    })}
                    {post.topics?.map((topic: Topic) => {
                        return <Tag title={topic.name} route={'/'} key={topic.id} />
                    })}
                </div>
                <div className={styles.Thumbs}>
                    <div className={styles.Thumb} onClick={() => onThumbsClick(true)}>
                        <ThumbsUpIcon />
                        <span className={styles.ThumbsCount}>{post.likes}</span>
                    </div>
                    <div className={clsx(styles.Thumb, styles.ThumbDown)} onClick={() => onThumbsClick(false)}>
                        <ThumbsDownIcon />
                        <span className={styles.ThumbsCount}>{post.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

ForumPost.defaultProps = {
    showBreadCrumbs: true
}

export default ForumPost
