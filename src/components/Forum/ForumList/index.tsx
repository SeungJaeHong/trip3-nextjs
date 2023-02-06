import styles from './ForumList.module.scss'
import ForumRow from '../ForumRow'
import {ContentMarketingPost, ForumRowType} from '../../../types'
import React, { Fragment } from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import ContentMarketingForumRow from "../../ContentMarketing/ForumRow";

type Props = {
    items: ForumRowType[]
    withAds: boolean
    onlyMiddleAd: boolean
    contentMarketingPost?: ContentMarketingPost
}

const Ads = dynamic(() => import('../../Ads'), { ssr: false })

const ForumList = ({ items, withAds, onlyMiddleAd, contentMarketingPost }: Props) => {
    const middle = withAds && items ? Math.floor(items?.length / 2) : undefined
    const oneThird = withAds && items ? Math.floor(items?.length / 3) : undefined
    const twoThirds = withAds && oneThird ? Math.floor(oneThird * 2) : undefined

    const renderRow = (item: ForumRowType, index: number) => {
        if (contentMarketingPost && index === 3) {
            return (
                <>
                    <div className={styles.ForumRow}>
                        <ContentMarketingForumRow {...contentMarketingPost} />
                    </div>
                    <div className={styles.ForumRow}>
                        <ForumRow {...item} />
                    </div>
                </>
            )
        } else return (
            <div className={styles.ForumRow}>
                <ForumRow {...item} />
            </div>
        )
    }

    return (
        <div className={styles.ForumList}>
            {items?.map((item: ForumRowType, index: number) => {
                if (withAds) {
                    return (
                        <Fragment key={item.id}>
                            {renderRow(item, index)}

                            {(!onlyMiddleAd && oneThird !== undefined && oneThird === index + 1) &&
                                <div className={clsx(styles.ForumRow, styles.Ad)}>
                                    <Ads type={'mobile_320x200_2'} />
                                </div>
                            }
                            {(!onlyMiddleAd && twoThirds !== undefined && twoThirds === index + 1) &&
                                <div className={clsx(styles.ForumRow, styles.Ad)}>
                                    <Ads type={'mobile_320x200_3'} />
                                </div>
                            }
                            {(middle !== undefined && middle === index + 1) &&
                                <div className={clsx(styles.ForumRow, styles.Ad)}>
                                    <Ads type={'desktop_body'} />
                                </div>
                            }
                            {(onlyMiddleAd && middle === index + 1) &&
                                <div className={clsx(styles.ForumRow, styles.Ad)}>
                                    <Ads type={'mobile_320x200_2'} />
                                </div>
                            }
                        </Fragment>
                    )
                } else {
                    return (
                        <div className={styles.ForumRow} key={item.id}>
                            <ForumRow {...item} />
                        </div>
                    )
                }
            })}
        </div>
    )
}

ForumList.defaultProps = {
    withAds: false,
    onlyMiddleAd: false
}

export default ForumList
