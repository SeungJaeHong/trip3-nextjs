import styles from './TravelmateCard.module.scss'
import Link from "next/link"
import {Destination, Topic, TravelmateRowType} from "../../../types"
import Tag from "../../Tag";
import UserAvatar from "../../User/UserAvatar";

const TravelmateCard = (item: TravelmateRowType) => {
    return (
        <div className={styles.TravelmateCard}>
            <Link href={'/'}>
                <a className={styles.UserName}>
                    {item.user.name}
                </a>
            </Link>
            <Link href={'/'}>
                <a className={styles.Title}>
                    {item.title}
                </a>
            </Link>
            <div className={styles.Tags}>
                {item.destinations?.map((destination: Destination) => {
                    return <Tag title={destination.name} route={'/sihtkoht/' + destination.slug} type={'destination'} key={destination.id}/>
                })}
                {item.topics?.map((topic: Topic) => {
                    return <Tag title={topic.name} route={'/'} key={topic.id }/>
                })}
            </div>
            <div className={styles.UserAvatar}>
                <UserAvatar user={item.user} />
            </div>
        </div>
    )
}

export default TravelmateCard