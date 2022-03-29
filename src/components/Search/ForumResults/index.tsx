import styles from './SearchForumResults.module.scss'
import stylesSearchPage from '../../../pages/search/SearchPage.module.scss'
import LoadingSpinner2 from '../../LoadingSpinner2'
import React, { useEffect, useState } from 'react'
import { ForumSearchResult, search } from '../../../services/search.service'
import Link from 'next/link'
import { getForumUrlByTypeAndSlug } from '../../../helpers'
import UserAvatar from '../../User/UserAvatar'
import { useRouter } from 'next/router'

type Props = {
    searchValue: string
}

const SearchForumResults = ({ searchValue }: Props) => {
    const [searching, setSearching] = useState<boolean>(false)
    const [results, setResults] = useState<ForumSearchResult[]>([])
    const [total, setTotal] = useState<number>(0)
    const router = useRouter()

    useEffect(() => {
        if (searchValue) {
            setSearching(true)
            search(searchValue, 'forum')
                .then((res) => {
                    setResults(res.data.items)
                    setTotal(res.data.total)
                })
                .finally(() => setSearching(false))
        }
    }, [searchValue])

    if (searching) {
        return (
            <div className={stylesSearchPage.Loader}>
                <LoadingSpinner2 />
            </div>
        )
    }

    return (
        <div className={styles.SearchForumResults}>
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
    )
}

export default SearchForumResults
