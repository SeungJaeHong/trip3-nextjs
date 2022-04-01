import styles from './SearchForumResults.module.scss'
import stylesSearchPage from '../../../pages/search/SearchPage.module.scss'
import LoadingSpinner2 from '../../LoadingSpinner2'
import React, {useEffect, useRef, useState} from 'react'
import { ForumSearchResult, search } from '../../../services/search.service'
import Link from 'next/link'
import {getForumUrlByTypeAndSlug, objectToQueryString} from '../../../helpers'
import UserAvatar from '../../User/UserAvatar'
import { useRouter } from 'next/router'
import PagePaginator from '../../Paginator/PagePaginator'

type Props = {
    searchValue: string
}

const SearchForumResults = ({ searchValue }: Props) => {
    const mounted = useRef(false)
    const type = 'forum'
    const itemsPerPage = 20
    const [searching, setSearching] = useState<boolean>(false)
    const [results, setResults] = useState<ForumSearchResult[]>([])
    const [total, setTotal] = useState<number|undefined>(undefined)
    const [page, setPage] = useState<number>(1)
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(itemsPerPage)
    const [lastPage, setLastPage] = useState<number>(1)
    const router = useRouter()

    const getPageFromRoute = () => {
        const pageValue = router.query.page
        if (pageValue && !Array.isArray(pageValue)) {
            return parseInt(pageValue)
        } else return 1
    }

    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])

    useEffect(() => {
        if (searchValue) {
            window.scrollTo(0, 0)
            setSearching(true)
            const pageValue = getPageFromRoute()
            const fromValue = (pageValue - 1) * itemsPerPage + 1
            search(searchValue, type, itemsPerPage, fromValue === 1 ? undefined : fromValue)
                .then((res) => {
                    if (mounted.current) {
                        setResults(res.data.items)
                        setTotal(res.data.total)
                        setPage(pageValue)
                        setFrom(fromValue)

                        let toValue = pageValue * itemsPerPage
                        if (toValue > res.data.total) {
                            toValue = res.data.total
                        }

                        setTo(toValue)
                        setLastPage(Math.round(res.data.total / itemsPerPage))
                    }
                })
                .catch((e) => {})
                .finally(() => {
                    if (mounted.current) {
                        setSearching(false)
                    }
                })
        }
    }, [searchValue, router.query.page])

    const renderPaginator = () => {
        if (!lastPage || lastPage <= 1) {
            return null
        }

        const urlParams = objectToQueryString({
            q: searchValue
        })
        return (
            <div className={styles.Paginator}>
                <PagePaginator currentPage={page} lastPage={lastPage} baseUrl={router.pathname + '?' + urlParams} />
            </div>
        )
    }

    if (searching) {
        return (
            <div className={stylesSearchPage.Loader}>
                <LoadingSpinner2 />
            </div>
        )
    }

    if (total === 0 ) {
        return (
            <div className={stylesSearchPage.NoResults}>
                Tulemusi ei leitud
            </div>
        )
    }

    return (
        <div className={styles.SearchForumResults}>
            {total && total > itemsPerPage &&
                <div className={styles.ResultCount}>
                    {`Kuvan ${from}-${to} tulemust ${total}-st`}
                </div>
            }
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
            {renderPaginator()}
        </div>
    )
}

export default SearchForumResults
