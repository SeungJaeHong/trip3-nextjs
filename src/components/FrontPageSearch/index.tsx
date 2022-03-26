import styles from './FrontPageSearch.module.scss'
import SearchIcon from '../../icons/SearchIcon'
import LoadingSpinner from '../LoadingSpinner'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import FrontPageSearchResults from './FrontPageSearchResults'
import LoadingSpinner2 from '../LoadingSpinner2'
import { DestinationSearchResult, FlightSearchResult, ForumSearchResult, search } from '../../services/search.service'
import { useDebounce } from 'use-debounce'

const FrontPageSearch = () => {
    const searchRef = useRef(null)
    const [value, setValue] = useState<string>('')
    const [destinations, setDestinations] = useState<DestinationSearchResult[]>([])
    const [flights, setFlights] = useState<FlightSearchResult[]>([])
    const [forum, setForum] = useState<ForumSearchResult[]>([])
    const [total, setTotal] = useState<number|undefined>(undefined)
    const [searching, setSearching] = useState<boolean>(false)
    const [debouncedValue] = useDebounce(value, 300)

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (debouncedValue && debouncedValue.length >= 3) {
            setSearching(true)
            search(debouncedValue)
                .then((res) => {
                    setDestinations(res.data.destinations)
                    setFlights(res.data.flights)
                    setForum(res.data.forum)
                    setTotal(res.data.total)
                })
                .finally(() => setSearching(false))
        }
    }, [debouncedValue])

    const renderResults = () => {
        if (searching) {
            return (
                <div className={styles.Loading}>
                    <div className={styles.Loader}>
                        <LoadingSpinner2 />
                    </div>
                </div>
            )
        } else {
            return <FrontPageSearchResults
                destinations={destinations}
                flights={flights}
                forum={forum}
                total={total}
            />
        }
    }

    return (
        <div className={styles.FrontPageSearchContainer} ref={searchRef}>
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
                    placeholder={'Kuhu sa täna tahaksid minna?'}
                    onChange={onValueChange}
                />
            </div>
            <div
                className={clsx(styles.SearchResults, {
                    [styles.ShowResults]: value.length >= 3,
                })}
            >
                {renderResults()}
            </div>
        </div>
    )
}

export default FrontPageSearch
