import styles from './FrontPageSearch.module.scss'
import SearchIcon from "../../icons/SearchIcon"
import LoadingSpinner from "../LoadingSpinner"

const FrontPageSearch = () => {
    return (
        <div className={styles.FrontPageSearchContainer}>
            <div className={styles.SearchInput}>
                <div className={styles.Icon}>
                    <SearchIcon width={'26'} height={'26'}/>
                </div>
                <input
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder={'Kuhu sa täna tahaksid minna?'}
                />
                <div className={styles.LoadingSpinner}>
                    <LoadingSpinner />
                </div>
            </div>
            <div className={styles.SearchResults}>
                Results
            </div>
        </div>
    )
}

export default FrontPageSearch