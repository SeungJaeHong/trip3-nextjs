import React from 'react'
import { GetServerSideProps } from 'next'
import { ForumRowType } from '../../../types'
import ForumIndexPage from '../../../components/Forum/ForumIndexPage'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import { objectToQueryString } from '../../../helpers'

type Props = {
    forumPosts: ForumRowType[]
    currentPage: number
    topic?: number
    destination?: number
    hasMore: boolean
    destinationOptions: { value: string; label: string }[]
    topicOptions: { value: string; label: string }[]
}

const MainForumIndex = (props: Props) => {
    return (
        <ForumIndexPage
            type={'general'}
            title={'Üldfoorum'}
            description={'Eesti suurim reisifoorum. Küsi siin oma küsimus või jaga häid soovitusi.'}
            searchPlaceholder={'Otsi üldfoorumist...'}
            {...props}
        />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const q = context.query?.q
    const destination = context.query?.destination
    const topic = context.query?.topic
    const page = context.query?.page
    let url = process.env.API_BASE_URL + '/forum/general'
    const urlParams = {
        q: q,
        topic: topic,
        destination: destination,
        page: page,
    }

    const queryString = objectToQueryString(urlParams)
    url += '?' + queryString

    const res = await ApiClientSSR(context).get(url)
    const destinationOptions: { value: string, label: string }[] = res.data?.destinations.map((destination: any) => ({ label: destination.name, value: destination.id.toString() }))
    const topicOptions: { value: string, label: string }[] = res.data?.topics.map((topic: any) => ({ label: topic.name, value: topic.id.toString() }))
    return {
        props: {
            forumPosts: res.data?.forumList.items || [],
            currentPage: page && typeof page === 'string' ? parseInt(page) : 1,
            hasMore: res.data.forumList?.hasMore || false,
            destinationOptions: destinationOptions || [],
            topicOptions: topicOptions || []
        },
    }
}

export default MainForumIndex
