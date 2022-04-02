import styles from './SearchForumResults.module.scss'
import React from 'react'
import { ForumSearchResult } from '../../../services/search.service'
import Link from 'next/link'
import {getForumUrlByTypeAndSlug} from '../../../helpers'
import UserAvatar from '../../User/UserAvatar'
import { useRouter } from 'next/router'

type Props = {
    results: ForumSearchResult[]
}

const SearchForumResults = ({ results }: Props) => {
    const router = useRouter()
    return (
        <div className={styles.SearchForumResults}>
            <div className={styles.Results}>
                {results.map((result) => {
                    const itemUrl = getForumUrlByTypeAndSlug(result.type, result.slug)
                    return (
                        <div className={styles.ForumRow} key={result.id}>
                            <div className={styles.TitleContainer}>
                                <Link href={itemUrl}>
                                    <a className={styles.Title}>{result.title}</a>
                                </Link>
                                <div className={styles.CreatedAt}>{result.created_at}</div>
                            </div>
                            <div className={styles.ContentContainer}>
                                <div className={styles.User} onClick={() => router.push('/user/' + result.user.id)}>
                                    <UserAvatar user={result.user} />
                                </div>
                                <Link href={itemUrl}>
                                    <a className={styles.Content}>
                                        {result.body.length > 300
                                            ? result.body.substring(0, 300).concat('...')
                                            : result.body}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchForumResults
