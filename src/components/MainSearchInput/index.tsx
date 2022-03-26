import styles from './MainSearchInput.module.scss'
import SearchIcon from "../../icons/SearchIcon"

type Props = {
    placeholder?: string
}

const MainSearchInput = (props: Props) => {
    return (
        <div className={styles.MainSearchInput}>
            <div className={styles.Icon}>
                <SearchIcon />
            </div>
            <input
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder={props.placeholder}
            />
            <button>
                <span>Otsi</span>
            </button>
        </div>
    )
}

export default MainSearchInput