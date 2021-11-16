import styles from './ForumList.module.scss'
import ForumRow from "../ForumRow"
import {ForumRowType} from "../../../types"

const ForumList = (props: {items: ForumRowType[]}) => {
    return (
        <div className={styles.ForumList}>
            {props.items?.map((item: ForumRowType) => {
                return (
                    <div className={styles.ForumRow} key={item.id}>
                        <ForumRow {...item} />
                    </div>
                )
            })}
        </div>
    )
}

export default ForumList