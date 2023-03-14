import React from 'react'
import styles from './ContentMarketingSlideItem.module.scss'
import { ContentMarketingPost } from '../../../types'
import Tag from '../../Tag'

const ContentMarketingSlideItem = (item: ContentMarketingPost) => {
    return (
        <div className={styles.Container}>
            <div className={styles.Image}>
                <img src={item.backgroundImageUrl} alt={item.title} />
            </div>
            <div className={styles.Content}>
                <div className={styles.Client}>
                    <img src={item.clientLogoUrl} alt={item.clientName} />
                    <Tag title={'Sisuturundus'} className={styles.Tag} />
                </div>
                <div className={styles.Title}>{item.title}</div>
            </div>
        </div>
    )
}

export default ContentMarketingSlideItem
