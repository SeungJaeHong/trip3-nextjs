import styles from './ForumList.module.scss'
import ForumRow from "../ForumRow"
import {ForumRowItem} from "../../../types"

const ForumList = (props: {items: ForumRowItem[]}) => {
    return (
        <div className={styles.ForumList}>
            {props.items.map((item: ForumRowItem) => {
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