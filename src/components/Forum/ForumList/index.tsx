import styles from './ForumList.module.scss'
import ForumRow from '../ForumRow'
import { ForumRowType } from '../../../types'
import React, { Fragment } from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

type Props = {
    items: ForumRowType[]
    withAds: boolean
}

const Ads = dynamic(() => import('../../Ads'), { ssr: false })

const ForumList = ({ items, withAds }: Props) => {
    const middle = withAds && items ? Math.floor(items?.length / 2) : undefined
    const oneThird = withAds && items ? Math.floor(items?.length / 3) : undefined
    const twoThirds = withAds && oneThird ? Math.floor(oneThird * 2) : undefined

    return (
        <div className={styles.ForumList}>
            {items?.map((item: ForumRowType, index: number) => {
                if (withAds) {
                    return (
                        <Fragment key={item.id}>
                            <div className={styles.ForumRow}>
                                <ForumRow {...item} />
                            </div>
                            {(oneThird !== undefined && oneThird === index + 1) &&
                                <div className={clsx(styles.ForumRow, styles.Ad)}>
                                    <Ads type={'mobile_320x100'} />
                                </div>
                            }
                            {(twoThirds !== undefined && twoThirds === index + 1) &&
                                <div className={clsx(styles.ForumRow, styles.Ad)}>
                                    <Ads type={'mobile_320x100_lower'} />
                                </div>
                            }
                            {(middle !== undefined && middle === index + 1) &&
                                <div className={clsx(styles.ForumRow, styles.Ad)}>
                                    <Ads type={'desktop_list_middle'} />
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
}

export default ForumList
