import Link from 'next/link'
import styles from './ForumList.module.scss'
import UserIcon from '../../../icons/UserIcon'
import ForumRow from "../ForumRow";

//todo: row components and stuff
const ForumList = (props: any) => {
    return (
        <div className={styles.ForumList}>
            <div className={styles.ForumRow}>
                <ForumRow />
            </div>
            <div className={styles.ForumRow}>
                <ForumRow />
            </div>
            <div className={styles.ForumRow}>
                <ForumRow />
            </div>
            <div className={styles.ForumRow}>
                <ForumRow />
            </div>
            <div className={styles.ForumRow}>
                <ForumRow />
            </div>
            <div className={styles.ForumRow}>
                <ForumRow />
            </div>
            <div className={styles.ForumRow}>
                <ForumRow />
            </div>
            <div className={styles.ForumRow}>
                <ForumRow />
            </div>
            <div className={styles.ForumRow}>
                <ForumRow />
            </div>
        </div>
    )
}

export default ForumList