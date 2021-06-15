import React, {Fragment, useEffect, useState} from 'react'
import Header from "../../components/Header"
import {GetServerSideProps} from "next";
import axios from "axios";

const NewsIndex = () => {
    return (
        <Fragment>
            <Header title={'Uudised'} />
            <div>
                Uudised
            </div>
        </Fragment>
    )
}

/*export const getServerSideProps: GetServerSideProps = async (context) => {
    const url = 'https://random-data-api.com/api/cannabis/random_cannabis'
    const response = await axios.get(url)
    return {
        props: {
            content: response.data,
        }
    }
}*/

export default NewsIndex