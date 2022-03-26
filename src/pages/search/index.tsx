import React, {Fragment, useEffect, useState} from "react"
import clsx from "clsx"
import containerStyle from "../../styles/containers.module.scss"
import styles from './SearchPage.module.scss'
import {useRouter} from "next/router"
import LoadingSpinner2 from "../../components/LoadingSpinner2"
import BackgroundMap from "../../components/BackgroundMap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MainSearchInput from "../../components/MainSearchInput";
import SearchTabs from "../../components/Search/SearchTabs";

const SearchPage = () => {
    const router = useRouter()
    const [searching, setSearching] = useState<boolean>(false)

    const renderContent = () => {
        if (searching) {
            return (
                <div className={styles.Loader}>
                    <LoadingSpinner2 />
                </div>
            )
        } else {
            return (
                <div>
                    Content
                </div>
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
                        <MainSearchInput placeholder={'Otsi..'} />
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
                            <div className={styles.Body}>
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer simple={false} />
        </Fragment>
    )
}

export default SearchPage