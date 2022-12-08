import React, {Fragment, useEffect, useState} from 'react'
import styles from './ForumPostComments.module.scss'
import { Comment, ForumPostType } from '../../../types'
import ForumComment from '../ForumComment'
import PagePaginator from '../../Paginator/PagePaginator'
import { getForumUrlByTypeAndSlug } from '../../../helpers'
import clsx from 'clsx'
import dynamic from "next/dynamic";

const Ads = dynamic(() => import('../../Ads'), { ssr: false })

type Props = {
    post: ForumPostType
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

    const middle = forumComments?.length >= 10 ? Math.floor(forumComments?.length / 2) : undefined
    const mobileMiddle = (forumComments?.length >= 5 && forumComments?.length < 12) ? Math.floor(forumComments?.length / 2) : undefined
    const oneThird = forumComments?.length >= 12 ? Math.floor(forumComments?.length / 3) : undefined
    const twoThirds = oneThird ? Math.floor(oneThird * 2) : undefined

    return (
        <div className={styles.ForumPostComments}>
            {lastPage && lastPage !== 1 && (
                <div className={styles.Paginator}>
                    <PagePaginator currentPage={currentPage} lastPage={lastPage} baseUrl={url} />
                </div>
            )}
            {forumComments?.map((item: Comment, index: number) => {
                return (
                    <Fragment key={item.id}>
                        <div className={styles.CommentRow} >
                            <ForumComment key={item.id} item={item} />
                        </div>

                        {(oneThird !== undefined && oneThird === index + 1) &&
                            <div className={clsx(styles.Ad)}>
                                <Ads type={'mobile_320x100'} />
                            </div>
                        }
                        {(twoThirds !== undefined && twoThirds === index + 1) &&
                            <div className={clsx(styles.Ad)}>
                                <Ads type={'mobile_320x100_lower'} />
                            </div>
                        }
                        {(middle !== undefined && middle === index + 1) &&
                            <div className={clsx(styles.Ad)}>
                                <Ads type={'desktop_list_middle'} />
                            </div>
                        }
                        {(mobileMiddle !== undefined && mobileMiddle === index + 1) &&
                            <div className={clsx(styles.Ad)}>
                                <Ads type={'mobile_320x100'} />
                            </div>
                        }
                    </Fragment>
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
