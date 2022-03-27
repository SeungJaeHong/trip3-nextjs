import React, { Fragment, useEffect, useState } from 'react'
import clsx from 'clsx'
import containerStyle from '../../styles/containers.module.scss'
import styles from './SearchPage.module.scss'
import { useRouter } from 'next/router'
import LoadingSpinner2 from '../../components/LoadingSpinner2'
import BackgroundMap from '../../components/BackgroundMap'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MainSearchInput from '../../components/MainSearchInput'
import SearchTabs from '../../components/Search/SearchTabs'
import {search} from "../../services/search.service";

const SearchPage = () => {
    const router = useRouter()
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchType, setSearchType] = useState<string>('')
    const [searching, setSearching] = useState<boolean>(false)
    const [results, setResults] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0)

    const onSearch = (value: string) => {
        console.log(value, 'onSearch')
        router.push('/search?q=' + value)
    }

    useEffect(() => {
        const q = router.query.q
        const type = router.query.type
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
    }, [router.query])

    useEffect(() => {
        if (searchValue) {
            setSearching(true)
            search(searchValue)
                .then((res) => {
                    setResults(res.data.items)
                    setTotal(res.data.total)
                })
                .finally(() => setSearching(false))
        }
    }, [searchValue, searchType])

    console.log(results)

    const renderContent = () => {
        if (searching) {
            return (
                <div className={styles.Loader}>
                    <LoadingSpinner2 />
                </div>
            )
        } else {
            if (router.query.q !== undefined && !router.query.q) {
                return <div>Sisesta otsingu väärtus</div>
            } else {
                return <div>Content</div>
            }
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
                        <MainSearchInput placeholder={'Otsi..'} onSearchClick={onSearch} value={searchValue} />
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
