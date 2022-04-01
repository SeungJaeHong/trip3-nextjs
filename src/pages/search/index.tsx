import React, { Fragment, useEffect, useState } from 'react'
import clsx from 'clsx'
import containerStyle from '../../styles/containers.module.scss'
import styles from './SearchPage.module.scss'
import { useRouter } from 'next/router'
import BackgroundMap from '../../components/BackgroundMap'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import MainSearchInput from '../../components/MainSearchInput'
import SearchTabs from '../../components/Search/SearchTabs'
import SearchForumResults from "../../components/Search/ForumResults"
import SearchFlightResults from "../../components/Search/FlightResults";

const SearchPage = () => {
    const router = useRouter()
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchType, setSearchType] = useState<string>('forum')

    const onSearch = (value: string) => {
        router.push('/search?q=' + value + '&type=' + searchType)
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

    const renderContent = () => {
        if (!searchValue) {
            return null
        }

        if (router.query.q !== undefined && !router.query.q) {
            return <div>Sisesta otsingu väärtus</div>
        } else {
            switch (searchType) {
                case 'forum':
                    return <SearchForumResults searchValue={searchValue}/>
                case 'flight':
                    return <SearchFlightResults searchValue={searchValue} />
                case 'destination':
                    return <div>AASDF3</div>
                default:
                    return null
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
