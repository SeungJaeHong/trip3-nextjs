import styles from './FrontPageSearch.module.scss'
import SearchIcon from "../../icons/SearchIcon"

const FrontPageSearch = () => {
    return (
        <div className={styles.FrontPageSearch}>
            <input
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder="Kuhu sa täna tahaksid minna?"
            />
            <div className={styles.Icon}>
                <SearchIcon width={'26'} height={'26'}/>
            </div>
        </div>
    )
}

export default FrontPageSearch