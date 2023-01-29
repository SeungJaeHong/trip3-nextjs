import styles from './FlightOfferStickies.module.scss'
import { FlightOfferRowType } from '../../../types'
import FlightOfferRow from '../FlightOfferRow'
import React from 'react'

type Props = {
    items: FlightOfferRowType[]
}

const FlightOfferStickies = ({ items }: Props) => {
    return (
        <div className={styles.Container}>
            {items?.map((item: FlightOfferRowType) => {
                return (
                    <div className={styles.FlightOfferRow} key={item.id}>
                        <FlightOfferRow {...item} />
                    </div>
                )
            })}
        </div>
    )
}

export default FlightOfferStickies
