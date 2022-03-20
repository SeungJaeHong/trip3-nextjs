import styles from './FrontPageSearch.module.scss'
import SearchIcon from "../../icons/SearchIcon"
import LoadingSpinner from "../LoadingSpinner"
import {ChangeEvent, useEffect, useRef, useState} from "react"
import clsx from "clsx"
import FrontPageSearchResults from "./FrontPageSearchResults"

const FrontPageSearch = () => {
    const searchRef = useRef(null)
    const [value, setValue] = useState<string>('')
    const [searching, setSearching] = useState<boolean>(false)

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (value && value.length >= 3) {
            setSearching(true)
        }
    }, [value])

    return (
        <div className={styles.FrontPageSearchContainer} ref={searchRef}>
            <div className={clsx(styles.SearchInput, {
                [styles.HasValue]: value.length > 0
            })}>
                <div className={styles.Icon}>
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder={'Kuhu sa täna tahaksid minna?'}
                    onChange={onValueChange}
                />
                <div className={styles.LoadingSpinner}>
                    <LoadingSpinner />
                </div>
            </div>
            <div className={clsx(styles.SearchResults, {
                [styles.ShowResults]: value.length >= 3
            })}>
                <FrontPageSearchResults results={[]} />
            </div>
        </div>
    )
}

export default FrontPageSearch