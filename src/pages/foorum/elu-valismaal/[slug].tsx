import React, {Fragment} from 'react'
import axios from 'axios'
import {GetServerSideProps} from 'next'
import {Content} from "../../../types"
import ForumShowPage from "../../../components/Forum/ForumShowPage"

type Props = {
    post: Content,
    currentPage: number,
    lastPage: number
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

    const response = await axios.get(url)
    const data = {
        user: response.data.user,
        post: response.data.post,
        currentPage: response.data.currentPage,
        lastPage: response.data.lastPage
    }

    return {
        props: data
    }
}

export default ForeignShow