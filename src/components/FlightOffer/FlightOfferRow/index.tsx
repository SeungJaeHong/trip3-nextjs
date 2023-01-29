import React from "react"
import Link from 'next/link'
import styles from './FlightOfferRow.module.scss'
import TicketsIcon from "../../../icons/TicketsIcon"
import {Destination, FlightOfferRowType, Tag as TagType} from "../../../types"
import Tag from "../../Tag"
import clsx from "clsx";

const FlightOfferRow = (item: FlightOfferRowType) => {
    return (
        <div className={clsx(styles.FlightOfferRow, {
            [styles.Sticky]: item.sticky
        })}>
            <div className={styles.Icon}>
                <TicketsIcon />
            </div>
            <div className={styles.Content}>
                <Link href={'/odavad-lennupiletid/' + item.slug}>
                    <a className={styles.Title}>{item.title}</a>
                </Link>
                <div className={styles.Meta}>
                    <span className={styles.CreatedDate}>{item.createdAt}</span>
                    <div className={styles.Tags}>
                        {item.destinations?.map((destination: Destination) => {
                            return <Tag title={destination.name} type={'destination'} route={'/sihtkoht/' + destination.slug} key={destination.id} />
                        })}
                        {item.tags?.map((tag: TagType) => {
                            return <Tag title={tag.name} key={tag.id} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightOfferRow