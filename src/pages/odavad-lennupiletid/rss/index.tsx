import React from 'react'
import { GetServerSideProps } from 'next'
import { Feed } from 'feed'
import { getLatestFlights } from '../../../services/flight.service'
import { FlightOfferRowType } from '../../../types'

const hostUrl = process.env.APP_URL as string

const buildFeed = (items: FlightOfferRowType[]) => {
    const feed = new Feed({
        id: hostUrl,
        link: hostUrl,
        title: 'Trip.ee | Lennupakkumised',
        description: 'Kõik odavad lennupiletid mugavalt ühelt lehel. Vaata soodsaid lennupakkumisi ning alusta oma reisi planeerimist siit',
        copyright: `Copyright © 1998 - ${new Date().getFullYear()} Trip.ee`,
        updated: new Date(items[0].createdAtRaw),
    })

    items.forEach((item) => {
        feed.addItem({
            title: item.title,
            link: `${hostUrl}/odavad-lennupiletid/${item.slug}`,
            date: new Date(item.createdAtRaw),
        })
    })

    return feed
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context && context.res) {
        const { res } = context
        const flights = await getLatestFlights(15)
        const feed = buildFeed(flights.data)

        res.setHeader('content-type', 'text/xml')
        res.write(feed.rss2())
        res.end()
    }

    return {
        props: {},
    }
}

const FlightsRss = () => null

export default FlightsRss
