import Link from 'next/link'
import styles from './ForumComment.module.scss'
import {Comment} from "../../../types"
import UserAvatar from "../../User/UserAvatar"
import ThumbsUpIcon from "../../../icons/ThumbsUpIcon";
import ThumbsDownIcon from "../../../icons/ThumbsDownIcon";
import clsx from "clsx";
import {useAppSelector} from "../../../hooks";
import {selectUser} from "../../../redux/auth";
import React, {useState} from "react";
import CommentEditor from "../../CommentEditor";
import {updateComment, rateComment, toggleCommentStatus} from "../../../services/comment.service";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";

type Props = {
    item: Comment
    type: string
}

const ForumComment = ({item, type}: Props) => {
    const user = useAppSelector(selectUser)
    const [comment, setComment] = useState(item)
    const userIsLoggedIn = user && user?.id
    const userIsAdmin = user && user.isAdmin
    const isCommentOwner = user && user.id === comment.user.id
    const canEditComment = comment.hasTimeToEdit && isCommentOwner
    const [editMode, setEditMode] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const onThumbsClick = (value: boolean) => {
        if (userIsLoggedIn) {
            rateComment(comment, value, type).then(res => {
                setComment(res.data)
            }).catch(err => {})
        }
    }

    const onToggleStatus = () => {
        if (userIsLoggedIn) {
            const status = !!comment.status
            toggleCommentStatus(comment, status, type).then(res => {
                setComment(res.data)
                toast.success(res.data.status === 1 ? 'Kommentaar avalikustatud' : 'Kommentaar peidetud')
            }).catch(err => {
                if (err.response?.status === 401 || err.response?.status === 419) {
                    toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                    router.reload()
                }
            })
        }
    }

    const onCommentEditSubmit = async (value: string) => {
        setSubmitting(true)
        const res = await updateComment(comment, value, type).then((response) => {
            setComment(response.data)
            setSubmitting(false)
            setEditMode(false)
            toast.success('Kommentaar muudetud', {
                duration: 4000
            })
        }).catch(err => {
            if (err.response?.status === 401 || err.response?.status === 419) {
                toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
            } else if(err.response?.status === 422 && err.response?.data?.errors ) {
                toast.error('Kommentaari sisu on kohustuslik!')
            } else {
                toast.error('Kommentaari muutmine ebaõnnestus')
            }
            setSubmitting(false)
        })
    }

    const onClose = () => {
        setEditMode(false)
    }

    const renderActionButtons = () => {
        if (!user?.id) {
            return null
        }

        if (userIsAdmin) {
            return (
                <div className={styles.Buttons}>
                    <span className={styles.ActionButton} onClick={() => setEditMode(true)}>Muuda</span> /
                    <span className={styles.ActionButton} onClick={onToggleStatus}>
                        {comment.status === 1 ? 'Peida' : 'Avalikusta'}
                    </span>
                </div>
            )
        } else if (canEditComment) {
            return (
                <div className={styles.Buttons}>
                    <span className={styles.ActionButton} onClick={() => setEditMode(true)}>Muuda</span>
                </div>
            )
        } else {
            return null
        }
    }

    if (editMode) {
        return (
            <CommentEditor
                id={'comment-editor-' + comment.id}
                onSubmit={onCommentEditSubmit}
                value={comment.body}
                submitButtonName={'Salvesta'}
                submitting={submitting}
                onCloseButtonTitle={'Katkesta'}
                onClose={onClose} />
        )
    }

    return (
        <div className={clsx(styles.ForumComment, {
            [styles.Hidden]: comment.status === 0
        })} id={comment.id.toString()}>
            <div className={styles.MetaData}>
                <Link href={'/'}>
                    <a className={styles.User}>{comment.user.name}</a>
                </Link>
                <div className={styles.CreatedDate}>
                    {comment.createdAt}
                </div>
                <div className={styles.UserAvatar}>
                    <UserAvatar user={comment.user} />
                </div>
            </div>
            <div className={styles.Body} dangerouslySetInnerHTML={{ __html: comment.body }} />
            <div className={clsx(styles.Actions, {
                [styles.MoreActions]: userIsAdmin || canEditComment
            })}>
                {renderActionButtons()}
                <div className={styles.Thumbs}>
                    <div className={styles.Thumb} onClick={() => onThumbsClick(true)}>
                        <ThumbsUpIcon />
                        <span className={styles.ThumbsCount}>{comment.likes}</span>
                    </div>
                    <div className={clsx(styles.Thumb, styles.ThumbDown)} onClick={() => onThumbsClick(false)}>
                        <ThumbsDownIcon />
                        <span className={styles.ThumbsCount}>{comment.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

ForumComment.defaultProps = {
    type: 'forum'
}

export default ForumComment