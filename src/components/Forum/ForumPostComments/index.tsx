import { useEffect, useState } from 'react'
import styles from './ForumPostComments.module.scss'
import { Comment, Content } from '../../../types'
import ForumComment from '../ForumComment'
import PagePaginator from '../../Paginator/PagePaginator'
import { getForumUrlByTypeAndSlug } from '../../../helpers'
import clsx from 'clsx'

type Props = {
    post: Content
    comments?: Comment[]
    currentPage: number
    lastPage: number
}

const ForumPostComments = ({ post, comments, currentPage, lastPage }: Props) => {
    const [forumComments, setForumComments] = useState(comments)
    let url = ''
    if (post.type === 'internal') {
        url = '/admin/forum/' + post.id
    } else {
        url = getForumUrlByTypeAndSlug(post.type, post.slug)
    }

    useEffect(() => {
        setForumComments(comments)
    }, [comments])

    if (!forumComments) {
        return null
    }

    return (
        <div className={styles.ForumPostComments}>
            {lastPage && lastPage !== 1 && (
                <div className={styles.Paginator}>
                    <PagePaginator currentPage={currentPage} lastPage={lastPage} baseUrl={url} />
                </div>
            )}
            {forumComments?.map((item: Comment) => {
                return (
                    <div className={styles.CommentRow} key={item.id}>
                        <ForumComment key={item.id} item={item} />
                    </div>
                )
            })}
            {lastPage && lastPage !== 1 && (
                <div className={clsx(styles.Paginator, styles.Bottom)}>
                    <PagePaginator currentPage={currentPage} lastPage={lastPage} baseUrl={url} />
                </div>
            )}
        </div>
    )
}

export default ForumPostComments
