import styles from './FlightOfferList.module.scss'
import { FlightOfferRowType } from '../../../types'
import FlightOfferRow from '../FlightOfferRow'
import React, { Fragment } from 'react'
import clsx from "clsx";
import dynamic from "next/dynamic";

const Ads = dynamic(() => import('../../Ads'), { ssr: false })

type Props = {
    items: FlightOfferRowType[]
    withAds: boolean
}

const FlightOfferList = ({ items, withAds }: Props) => {
    const middle = withAds && items ? Math.floor(items?.length / 2) : undefined
    const oneThird = withAds && items ? Math.floor(items?.length / 3) : undefined
    const twoThirds = withAds && oneThird ? Math.floor(oneThird * 2) : undefined

    return (
        <div className={styles.FlightOfferList}>
            {items?.map((item: FlightOfferRowType, index: number) => {
                if (withAds) {
                    return (
                        <Fragment key={item.id}>
                            <div className={styles.FlightOfferRow}>
                                <FlightOfferRow {...item} />
                            </div>
                            {(oneThird !== undefined && oneThird === index + 1) &&
                                <div className={clsx(styles.Ad)}>
                                    <Ads type={'mobile_320x200'} />
                                </div>
                            }
                            {(twoThirds !== undefined && twoThirds === index + 1) &&
                                <div className={clsx(styles.Ad)}>
                                    <Ads type={'mobile_320x100_lower'} />
                                </div>
                            }
                            {(middle !== undefined && middle === index + 1) &&
                                <div className={clsx(styles.Ad)}>
                                    <Ads type={'desktop_list_middle'} />
                                </div>
                            }
                        </Fragment>
                    )
                } else {
                    return (
                        <div className={styles.FlightOfferRow} key={item.id}>
                            <FlightOfferRow {...item} />
                        </div>
                    )
                }
            })}
        </div>
    )
}

FlightOfferList.defaultProps = {
    withAds: false,
}

export default FlightOfferList
