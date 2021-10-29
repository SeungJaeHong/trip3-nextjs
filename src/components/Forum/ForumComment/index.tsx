import Link from 'next/link'
import styles from './ForumComment.module.scss'
import {Comment, User} from "../../../types"
import ReactMarkdown from "react-markdown"
import UserAvatar from "../../User/UserAvatar"
import ThumbsUpIcon from "../../../icons/ThumbsUpIcon";
import ThumbsDownIcon from "../../../icons/ThumbsDownIcon";
import clsx from "clsx";
import {useAppSelector} from "../../../hooks";
import {selectUser} from "../../../redux/auth";

type Props = {
    item: Comment
    onThumbsClick: (comment: Comment, type: boolean) => void
    onToggleStatus: (comment: Comment) => void
}

const ForumComment = ({item, onThumbsClick, onToggleStatus}: Props) => {
    const user = useAppSelector(selectUser)
    const userIsAdmin = user && user.isAdmin
    const isCommentOwner = user && user.id === item.user.id

    const onThumbsUpClick = () => {
        onThumbsClick(item, true)
    }

    const onThumbsDownClick = () => {
        onThumbsClick(item, false)
    }

    const onChangeStatus = () => {
        onToggleStatus(item)
    }

    const renderActionButtons = () => {
        if (!user?.id) {
            return null
        }

        if (userIsAdmin) {
            return (
                <div className={styles.Buttons}>
                    <span className={styles.ActionButton}>Muuda</span> /
                    <span className={styles.ActionButton} onClick={onChangeStatus}>
                        {item.status === 1 ? 'Peida' : 'Avalikusta'}
                    </span>
                </div>
            )
        } else if (item.hasTimeToEdit && isCommentOwner) {
            return <span className={styles.ActionButton}>Muuda</span>
        } else {
            return null
        }
    }

    return (
        <div className={clsx(styles.ForumComment, {
            [styles.Hidden]: item.status === 0
        })}>
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
            <div className={styles.Body}>
                <ReactMarkdown linkTarget={'_blank'} children={item.body} />
            </div>
            <div className={styles.Actions}>
                {renderActionButtons()}
                <div className={styles.Thumbs}>
                    <div className={styles.Thumb} onClick={onThumbsUpClick}>
                        <ThumbsUpIcon />
                        <span className={styles.ThumbsCount}>{item.likes}</span>
                    </div>
                    <div className={clsx(styles.Thumb, styles.ThumbDown)} onClick={onThumbsDownClick}>
                        <ThumbsDownIcon />
                        <span className={styles.ThumbsCount}>{item.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumComment