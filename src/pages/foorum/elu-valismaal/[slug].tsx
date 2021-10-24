import React from 'react'
import {GetServerSideProps} from 'next'
import {Content} from "../../../types"
import ForumShowPage from "../../../components/Forum/ForumShowPage"
import ApiClientSSR from "../../../lib/ApiClientSSR";

type Props = {
    post: Content,
    currentPage: number,
    lastPage: number,
    lastCommentId?: number
}

const ForeignShow = (props: Props) => {
    return <ForumShowPage {...props} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.query.slug
    const page = context.query?.page
    let url = process.env.API_BASE_URL + '/forum/expat/' + slug
    if (page) {
        url += '?page=' + page
    }

    const response = await ApiClientSSR(context).get(url)
    const data = {
        post: response.data.post,
        currentPage: response.data.currentPage,
        lastPage: response.data.lastPage,
        lastCommentId: response.data.lastCommentId,
    }

    return {
        props: data
    }
}

export default ForeignShow