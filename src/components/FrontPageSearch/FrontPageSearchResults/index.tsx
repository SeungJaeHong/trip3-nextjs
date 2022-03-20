import styles from './FrontPageSearchResults.module.scss'
import clsx from "clsx"
import LoadingSpinner2 from "../../LoadingSpinner2";

type Props = {
    results: []
}

const FrontPageSearchResults = ({results}: Props) => {

    return (
        <div className={styles.FrontPageSearchResults}>
            <div className={styles.Loader}>
                <LoadingSpinner2 />
            </div>
        </div>
    )
}

export default FrontPageSearchResults