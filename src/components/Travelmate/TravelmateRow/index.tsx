import Link from 'next/link'
import styles from './TravelmateRow.module.scss'
import UserIcon from '../../../icons/UserIcon'
import { Destination, Topic, TravelmateRowType } from '../../../types'
import Tag from '../../Tag'
import clsx from 'clsx'

const TravelmateRow = (item: TravelmateRowType) => {
    const renderDestinations = () => {
        if (item.destinations) {
            let hasMoreCount = undefined
            let destinations = item.destinations
            if (destinations.length > 4) {
                hasMoreCount = '+' + (destinations.length - 3)
                destinations = destinations.slice(0, 3)
            }

            return (
                <>
                    {destinations?.map((destination: Destination) => {
                        return (
                            <Tag
                                title={destination.name}
                                type={'destination'}
                                route={'/sihtkoht/' + destination.slug}
                                key={destination.id}
                            />
                        )
                    })}
                    {hasMoreCount !== undefined && <Tag title={hasMoreCount} type={'destination'} />}
                </>
            )
        }

        return null
    }

    return (
        <div className={styles.TravelmateRow}>
            <div className={styles.Avatar}>
                <Link href={'/reisikaaslased/' + item.slug}>
                    <a>
                        <UserIcon />
                    </a>
                </Link>
            </div>
            <div className={styles.Content}>
                <Link href={'/reisikaaslased/' + item.slug}>
                    <a className={styles.Title}>{item.title}</a>
                </Link>
                <div className={styles.Meta}>
                    <Link href={'/reisikaaslased/' + item.slug}>
                        <a className={styles.MetaItem}>{item.createdAt}</a>
                    </Link>
                    <Link href={'/user/' + item.user.id}>
                        <a className={clsx(styles.MetaItem, styles.Creator)}>{item.user.name}</a>
                    </Link>
                    <div className={styles.Tags}>
                        {renderDestinations()}
                        {item.topics?.map((topic: Topic) => {
                            return <Tag title={topic.name} route={'/'} key={topic.id} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TravelmateRow
