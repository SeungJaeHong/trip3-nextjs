import React, {Fragment, useEffect, useState} from 'react'
import Header from "../../components/Header"
import axios from "axios";

const NewsIndex = () => {
    const [data, setData] = useState({})
    const fetchData = async () => {
        return await axios('https://random-data-api.com/api/coffee/random_coffee')
    }

    useEffect(() => {
        fetchData().then((response) => {
            setData(response.data)
        });
    }, []);

    if (!Object.keys(data).length) {
        return <div>LOADING!</div>
    }

    return (
        <Fragment>
            <Header title={'Uudised'} />
            <div>
                {Object.keys(data).map((item) => {
                    return (
                        // @ts-ignore
                        <div key={item}>{data[item]}</div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default NewsIndex