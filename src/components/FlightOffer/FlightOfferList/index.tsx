import styles from './FlightOfferList.module.scss'
import { FlightOfferRowType } from '../../../types'
import FlightOfferRow from '../FlightOfferRow'
import { Fragment } from 'react'
import Ads from '../../Ads'
import clsx from "clsx";

type Props = {
    items: FlightOfferRowType[]
    withAds: boolean
}

const FlightOfferList = ({ items, withAds }: Props) => {
    const middle = withAds && items ? Math.floor(items?.length / 2) : undefined
    return (
        <div className={styles.FlightOfferList}>
            {items?.map((item: FlightOfferRowType, index: number) => {
                if (withAds && middle && middle === index) {
                    return (
                        <Fragment key={item.id}>
                            <div className={styles.FlightOfferRow}>
                                <FlightOfferRow {...item} />
                            </div>
                            <div className={clsx(styles.FlightOfferRow, styles.Ad)}>
                                <Ads type={'body'} />
                            </div>
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
