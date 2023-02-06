import Link from 'next/link'
import styles from './ContentMarketingForumRow.module.scss'
import clsx from 'clsx'
import {ContentMarketingPost} from '../../../types'
import Tag from '../../Tag'

const ContentMarketingForumRow = (item: ContentMarketingPost) => {
    return (
        <div className={styles.ForumRow}>
            <div className={styles.UserIcon}>
                <img src={item.clientLogoUrl} alt={item.clientName} />
            </div>
            <div className={styles.Content}>
                <Link href={'/sisuturundus/' + item.slug}>
                    <a>
                        <span className={styles.Title}>{item.title}</span>
                    </a>
                </Link>
                <div className={styles.Meta}>
                    {item.viewsCount >= 25 && (
                        <span className={clsx(styles.MetaItem, styles.ReadCount)}>Loetud {item.viewsCount} korda</span>
                    )}
                    <span className={clsx(styles.MetaItem, styles.Creator)}>
                        <Link href={'/sisuturundus/' + item.slug}>
                            <a>{item.clientName}</a>
                        </Link>
                    </span>
                    <div className={clsx(styles.MetaItem, styles.Tag)}>
                        <Tag
                            title={'Sisuturundus'}
                            type={'destination'}
                            route={'/sisuturundus/' + item.slug}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentMarketingForumRow
