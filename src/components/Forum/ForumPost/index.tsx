import Link from 'next/link'
import styles from './ForumPost.module.scss'
import { Destination, ForumPostType, Topic } from '../../../types'
import UserAvatar from '../../User/UserAvatar'
import ThumbsUpIcon from '../../../icons/ThumbsUpIcon'
import clsx from 'clsx'
import ThumbsDownIcon from '../../../icons/ThumbsDownIcon'
import Tag from '../../Tag'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import {togglePostStatus, likePost, toggleFollow} from '../../../services/forum.service'
import { toast } from 'react-toastify'
import Alert from '../../Alert'
import { useUser } from '../../../hooks'
import { getForumUrlByType } from '../../../helpers'

type Props = {
    item: ForumPostType
    showBreadCrumbs: boolean
}

const ForumPost = ({ item, showBreadCrumbs }: Props) => {
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
                    const newPost = { ...post, status: res.data }
                    setPost(newPost)
                    toast.success(newPost.status === 1 ? 'Postitus avalikustatud' : 'Postitus peidetud')
                })
                .catch((err) => {
                    toast.error('Postituse avalikustamine ebaõnnestus')
                })
        }
    }

    const onToggleFollow = () => {
        if (userIsLoggedIn) {
            const status = !post.following
            toggleFollow(post, status)
                .then((res) => {
                    const newPost = { ...post, following: res.data }
                    setPost(newPost)
                    toast.success(newPost.following ? 'Jälgimine listatud' : 'Jälgimine eemaldatud')
                })
                .catch((err) => {
                    toast.error('Jälgimise muutmine ebaõnnestus')
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

    const renderBreadCrumbs = () => {
        if (!showBreadCrumbs) {
            return null
        }

        const url = getForumUrlByType(post.type)
        let name = 'Üldfoorum'
        switch (post.type) {
            case 'buysell':
                name = 'Ost-müük'
                break
            case 'expat':
                name = 'Elu välismaal'
                break
            case 'misc':
                name = 'Vaba teema'
                break
        }

        return (
            <div className={styles.BreadCrumbs}>
                <Link href={'/foorum/uldfoorum'}>
                    <a>Foorum</a>
                </Link>
                <span>/</span>
                <Link href={url}>
                    <a>{name}</a>
                </Link>
            </div>
        )
    }

    return (
        <div className={styles.Container}>
            {renderBreadCrumbs()}
            <div className={styles.Post}>
                {post.status === 0 && (
                    <div className={styles.Alert}>
                        <Alert title={'Postitus ei ole avalikustatud!'} type={'warning'} />
                    </div>
                )}
                <div className={styles.TitleContainer}>
                    <div className={styles.Title}>{post.title}</div>
                    {userIsLoggedIn && (
                        <div
                            className={clsx(styles.FollowButton, {
                                [styles.Following]: post.following,
                            })}
                            onClick={onToggleFollow}
                        >
                            <span>{post.following ? 'Jälgin' : 'Jälgi'}</span>
                        </div>
                    )}
                </div>
                <div className={styles.MetaData}>
                    <div className={styles.UserAvatar}>
                        <UserAvatar user={post.user} />
                    </div>
                    <Link href={'/user/' + post.user.id}>
                        <a className={styles.User}>{post.user.name}</a>
                    </Link>
                    <div className={styles.CreatedDate}>{post.createdAt}</div>
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
        </div>
    )
}

ForumPost.defaultProps = {
    showBreadCrumbs: true,
}

export default ForumPost
