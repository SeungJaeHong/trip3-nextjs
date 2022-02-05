import styles from './TravelmateCard.module.scss'
import Link from 'next/link'
import { Destination, Topic, TravelmateRowType } from '../../../types'
import Tag from '../../Tag'
import UserAvatar from '../../User/UserAvatar'
import { useRouter } from 'next/router'

const TravelmateCard = (item: TravelmateRowType) => {
    const router = useRouter()
    return (
        <div className={styles.TravelmateCard}>
            <div className={styles.UserAndDate}>
                <Link href={'/user/' + item.user.id}>
                    <a className={styles.UserName}>{item.user.name}</a>
                </Link>
                <div className={styles.CreatedAt}>{item.createdAt}</div>
            </div>
            <Link href={'/reisikaaslased/' + item.slug}>
                <a className={styles.Title}>{item.title}</a>
            </Link>
            <div className={styles.Tags}>
                {item.destinations?.map((destination: Destination) => {
                    return (
                        <Tag
                            title={destination.name}
                            route={'/sihtkoht/' + destination.slug}
                            type={'destination'}
                            key={destination.id}
                        />
                    )
                })}
                {item.topics?.map((topic: Topic) => {
                    return <Tag title={topic.name} route={'/'} key={topic.id} />
                })}
            </div>
            <div
                className={styles.UserAvatar}
                onClick={() => router.push('/user/' + item.user.id)}
            >
                <UserAvatar user={item.user} />
            </div>
        </div>
    )
}

export default TravelmateCard
