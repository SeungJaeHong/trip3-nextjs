import styles from './MainSearchInput.module.scss'
import SearchIcon from "../../icons/SearchIcon"
import {BaseSyntheticEvent, useEffect, useState} from "react"

type Props = {
    value?: string
    placeholder?: string
    onSearchClick?: (value: string) => void
}

const MainSearchInput = ({value, placeholder, onSearchClick}: Props) => {
    const [inputValue, setInputValue] = useState<string|undefined>(value)

    const onValueChange = (e: BaseSyntheticEvent) => {
        setInputValue(e.target.value)
    }

    const onKeyPress = (e: KeyboardEvent) => {
        if (onSearchClick && e.key === "Enter") {
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
        <div className={styles.MainSearchInput}>
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
            <button onClick={onButtonClick}>
                <span>Otsi</span>
            </button>
        </div>
    )
}

export default MainSearchInput