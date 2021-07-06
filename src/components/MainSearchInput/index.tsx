import styles from './MainSearchInput.module.scss'
import SearchIcon from "../../icons/SearchIcon"

type Props = {
    placeholder: string
}

const MainSearchInput = (props: Props) => {
    return (
        <div className={styles.MainSearchInput}>
            <input
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder={props.placeholder}
            />
            <div className={styles.Icon}>
                <SearchIcon width={'26'} height={'26'}/>
            </div>
        </div>
    )
}

export default MainSearchInput