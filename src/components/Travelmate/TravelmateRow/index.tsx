import Link from 'next/link'
import styles from './TravelmateRow.module.scss'
import UserIcon from "../../../icons/UserIcon"
import {Destination, Topic, TravelmateRowType} from "../../../types"
import Tag from "../../Tag";
import clsx from "clsx";

const TravelmateRow = (item: TravelmateRowType) => {
    return (
        <div className={styles.TravelmateRow}>
            <div className={styles.Avatar}>
                <Link href={'/'}>
                    <a>
                        <UserIcon />
                    </a>
                </Link>
            </div>
            <div className={styles.Content}>
                <Link href={'/'}>
                    <a className={styles.Title}>{item.title}</a>
                </Link>
                <div className={styles.Meta}>
                    <Link href={'/'}>
                        <a className={styles.MetaItem}>{item.createdAt}</a>
                    </Link>
                    <Link href={'/'}>
                        <a className={clsx(styles.MetaItem, styles.Creator)}>{item.user.name}</a>
                    </Link>
                    {item.destinations?.map((destination: Destination) => {
                        return (
                            <div className={styles.MetaItem} key={destination.id}>
                                <Tag title={destination.name} type={'destination'} route={'/'} />
                            </div>
                        )
                    })}
                    {item.topics?.map((topic: Topic) => {
                        return (
                            <div className={styles.MetaItem} key={topic.id}>
                                <Tag title={topic.name} route={'/'} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TravelmateRow