import React from 'react'
import {GetServerSideProps} from 'next'
import {Content} from "../../../types"
import ForumShowPage from "../../../components/Forum/ForumShowPage"
import ApiClientSSR from "../../../lib/ApiClientSSR";

type Props = {
    post: Content,
    lastCommentId?: number
    currentPage: number,
    lastPage: number
}

const FreeTopicShow = (props: Props) => {
    return <ForumShowPage {...props} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const slug = context.query.slug
        const page = context.query?.page
        let url = process.env.API_BASE_URL + '/forum/misc/' + slug
        if (page) {
            url += '?page=' + page
        }

        const response = await ApiClientSSR(context).get(url)
        const data = {
            post: response.data.post,
            lastCommentId: response.data.lastCommentId,
            currentPage: response.data.currentPage,
            lastPage: response.data.lastPage,
        }

        return {
            props: data
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

export default FreeTopicShow