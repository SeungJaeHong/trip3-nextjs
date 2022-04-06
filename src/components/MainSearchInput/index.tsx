import styles from './MainSearchInput.module.scss'
import SearchIcon from '../../icons/SearchIcon'
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import clsx from "clsx"

type Props = {
    value?: string
    placeholder?: string
    onSearchClick?: (value: string) => void
    filterActive?: boolean
}

const MainSearchInput = ({ value, placeholder, onSearchClick, filterActive }: Props) => {
    const [inputValue, setInputValue] = useState<string | undefined>(value)

    const onValueChange = (e: BaseSyntheticEvent) => {
        setInputValue(e.target.value)
    }

    const onKeyPress = (e: KeyboardEvent) => {
        if (onSearchClick && e.key === 'Enter') {
            const element = e.target as HTMLInputElement
            if (element?.value) {
                onSearchClick(element?.value)
            }
        }
    }

    const onButtonClick = () => {
        if (inputValue && onSearchClick) {
            onSearchClick(inputValue)
        }
    }

    useEffect(() => {
        setInputValue(value)
    }, [value])

    return (
        <div className={clsx(styles.MainSearchInput, {
            [styles.FilterActive]: filterActive
        })}>
            <div className={styles.Icon}>
                <SearchIcon />
            </div>
            <input
                type="text"
                autoComplete="off"
                spellCheck={false}
                value={inputValue}
                placeholder={placeholder}
                onChange={onValueChange}
                // @ts-ignore
                onKeyPress={onKeyPress}
            />
            <div className={styles.Filter}>
                <span>Filter</span>
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="m7 10l5 5l5-5H7z" />
                </svg>
            </div>
            <button onClick={onButtonClick}>
                <span>Otsi</span>
            </button>
        </div>
    )
}

MainSearchInput.defaultProps = {
    filterActive: false
}

export default MainSearchInput
