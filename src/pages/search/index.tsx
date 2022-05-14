import React, { Fragment, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import containerStyle from '../../styles/containers.module.scss'
import styles from './SearchPage.module.scss'
import { useRouter } from 'next/router'
import BackgroundMap from '../../components/BackgroundMap'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MainSearchInput from '../../components/MainSearchInput'
import SearchTabs from '../../components/Search/SearchTabs'
import SearchForumResults from '../../components/Search/ForumResults'
import SearchFlightResults from '../../components/Search/FlightResults'
import { search } from '../../services/search.service'
import LoadingSpinner from '../../components/LoadingSpinner'
import { objectToQueryString } from '../../helpers'
import PagePaginator from '../../components/Paginator/PagePaginator'
import SearchNewsResults from '../../components/Search/NewsResults'
import SearchDestinationResults from '../../components/Search/DestinationResults'
import SearchUserResults from '../../components/Search/UserResults'

const SearchPage = () => {
    const mounted = useRef(false)
    const itemsPerPage: number = 20
    const minLength: number = 3
    const router = useRouter()
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchType, setSearchType] = useState<string>('forum')
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [searching, setSearching] = useState<boolean>(false)
    const [results, setResults] = useState<any[]>([])
    const [total, setTotal] = useState<number | undefined>(undefined)
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(itemsPerPage)
    const [lastPage, setLastPage] = useState<number>(1)
    const [invalidLength, setInvalidLength] = useState<boolean>(false)

    const onSearch = (value: string) => {
        if (value && value.length >= minLength) {
            setInvalidLength(false)
            router.push('/search?q=' + value + '&type=' + searchType)
        } else {
            setInvalidLength(true)
        }
    }

    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])

    useEffect(() => {
        const q = router.query.q
        const type = router.query.type
        const page = router.query.page
        if (mounted.current) {
            if (type !== undefined && type !== searchType) {
                setResults([])
            }

            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 20)
            if (q !== undefined) {
                if (Array.isArray(q)) {
                    setSearchValue(q[0])
                } else {
                    setSearchValue(q)
                }
            }
            if (type !== undefined) {
                if (Array.isArray(type)) {
                    setSearchType(type[0])
                } else {
                    setSearchType(type)
                }
            }

            if (page !== undefined) {
                if (Array.isArray(page)) {
                    setPageNumber(parseInt(page[0]))
                } else {
                    setPageNumber(parseInt(page))
                }
            } else {
                setPageNumber(1)
            }
        }
    }, [router.query])

    useEffect(() => {
        if (searchValue) {
            if (searchValue.length < minLength) {
                setInvalidLength(true)
            } else {
                window.scrollTo(0, 0)
                setInvalidLength(false)
                setSearching(true)
                setResults([])
                const fromValue = (pageNumber - 1) * itemsPerPage + 1
                search(searchValue, searchType, itemsPerPage, fromValue === 1 ? undefined : fromValue)
                    .then((res) => {
                        if (mounted.current) {
                            setResults(res.data.items)
                            setTotal(res.data.total)
                            setFrom(fromValue)

                            let toValue = pageNumber * itemsPerPage
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
        }
    }, [searchValue, searchType, pageNumber])

    const renderResultInfo = () => {
        if (total && total > itemsPerPage) {
            return <div className={styles.ResultCount}>{`Kuvan ${from}-${to} tulemust ${total}-st`}</div>
        } else return null
    }

    const renderPaginator = () => {
        if (!lastPage || lastPage <= 1) {
            return null
        }

        const urlParams = objectToQueryString({
            q: searchValue,
            type: searchType,
        })
        return (
            <div className={styles.Paginator}>
                <PagePaginator
                    currentPage={pageNumber}
                    lastPage={lastPage}
                    baseUrl={router.pathname + '?' + urlParams}
                />
            </div>
        )
    }

    const renderResultView = () => {
        switch (searchType) {
            case 'flight':
                return <SearchFlightResults results={results} />
            case 'news':
                return <SearchNewsResults results={results} />
            case 'destination':
                return <SearchDestinationResults results={results} />
            case 'user':
                return <SearchUserResults results={results} />
            default:
                return <SearchForumResults results={results} />
        }
    }

    const renderContent = () => {
        if (!searchValue) {
            return null
        }

        if (searching) {
            return (
                <div className={styles.Loader}>
                    <LoadingSpinner />
                </div>
            )
        }

        if (total === 0) {
            return <div className={styles.NoResults}>Tulemusi ei leitud</div>
        }

        if (router.query.q !== undefined && !router.query.q) {
            return <div>Sisesta otsingu väärtus</div>
        } else {
            return (
                <>
                    {renderResultInfo()}
                    {renderResultView()}
                    {renderPaginator()}
                </>
            )
        }
    }

    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.SearchBar}>
                        <div className={styles.Input}>
                            <MainSearchInput
                                placeholder={'Otsi..'}
                                onSearchClick={onSearch}
                                value={searchValue}
                                showFilter={false}
                            />
                        </div>
                        {invalidLength && <span>Vähemalt 3 tähemärki on nõutud!</span>}
                    </div>
                    <div className={containerStyle.ContainerLg}>
                        <div className={clsx(containerStyle.CenteredContainer, styles.Tabs)}>
                            <SearchTabs />
                        </div>
                    </div>
                </div>
                <div className={styles.Content}>
                    <div className={containerStyle.ContainerLg}>
                        <div className={containerStyle.CenteredContainer}>
                            <div className={styles.Body}>{renderContent()}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer simple={false} />
        </Fragment>
    )
}

export default SearchPage
