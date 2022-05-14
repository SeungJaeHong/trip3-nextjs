import styles from './FrontPageSearch.module.scss'
import SearchIcon from '../../icons/SearchIcon'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import FrontPageSearchResults from './FrontPageSearchResults'
import LoadingSpinner from '../LoadingSpinner'
import {
    DestinationSearchResult,
    FrontPageFlightSearchResult,
    FrontPageForumSearchResult,
    frontpageSearch,
} from '../../services/search.service'
import { useDebounce } from 'use-debounce'
import CloseIcon from '../../icons/CloseIcon'
import { useRouter } from 'next/router'

const FrontPageSearch = () => {
    const searchContainerRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState<string>('')
    const [showResults, setShowResults] = useState<boolean>(false)
    const [destinations, setDestinations] = useState<DestinationSearchResult[]>([])
    const [flights, setFlights] = useState<FrontPageFlightSearchResult[]>([])
    const [forum, setForum] = useState<FrontPageForumSearchResult[]>([])
    const [total, setTotal] = useState<number | undefined>(undefined)
    const [searching, setSearching] = useState<boolean>(false)
    const [debouncedValue] = useDebounce(value, 300)
    const router = useRouter()

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onValueClear = () => {
        setValue('')
        setShowResults(false)
        searchInputRef.current?.focus()
    }

    const onKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            router.push('/search?q=' + value)
        }
    }

    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            // @ts-ignore
            if (showResults && searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                setShowResults(false)
            }
        }

        if (showResults) {
            document.addEventListener('mousedown', checkIfClickedOutside)
        }

        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside)
        }
    }, [showResults])

    useEffect(() => {
        if (debouncedValue && debouncedValue.length >= 3) {
            setSearching(true)
            frontpageSearch(debouncedValue)
                .then((res) => {
                    setDestinations(res.data.destinations)
                    setFlights(res.data.flights)
                    setForum(res.data.forum)
                    setTotal(res.data.total)
                    setShowResults(true)
                })
                .finally(() => setSearching(false))
        } else {
            setShowResults(false)
        }
    }, [debouncedValue])

    const renderResults = () => {
        if (searching) {
            return (
                <div className={styles.Loading}>
                    <div className={styles.Loader}>
                        <LoadingSpinner />
                    </div>
                </div>
            )
        } else {
            if (showResults) {
                return (
                    <FrontPageSearchResults
                        searchValue={debouncedValue}
                        destinations={destinations}
                        flights={flights}
                        forum={forum}
                        total={total}
                    />
                )
            } else return null
        }
    }

    return (
        <div className={styles.FrontPageSearchContainer} ref={searchContainerRef}>
            <div
                className={clsx(styles.SearchInput, {
                    [styles.HasValue]: value.length > 0,
                })}
            >
                <div className={styles.Icon}>
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    value={value}
                    placeholder={'Kuhu sa täna tahaksid minna?'}
                    onChange={onValueChange}
                    ref={searchInputRef}
                    // @ts-ignore
                    onKeyPress={onKeyPress}
                />
                {value.length > 0 && (
                    <div className={styles.ClearButton} onClick={onValueClear}>
                        <CloseIcon />
                    </div>
                )}
            </div>
            <div
                className={clsx(styles.SearchResults, {
                    [styles.ShowResults]: showResults || searching,
                })}
            >
                {renderResults()}
            </div>
        </div>
    )
}

export default FrontPageSearch
