import Link from 'next/link'
import Image from 'next/image'
import styles from './ContentMarketingNewsCard.module.scss'
import {ContentMarketingPost} from "../../../types"
import Tag from "../../Tag";

const ContentMarketingNewsCard = (item: ContentMarketingPost) => {
    return (
        <div className={styles.Container}>
            <Link href={'/sisuturundus/' + item.slug}>
                <a>
                    <div className={styles.Background}>
                        <Image
                            src={item.backgroundImageUrl}
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className={styles.Title}>
                        {item.title}
                    </div>
                </a>
            </Link>
            <div className={styles.CreatedAt}>
                {item.clientName} <Tag title={'Sisuturundus'} />
            </div>
        </div>
    )
}

export default ContentMarketingNewsCard