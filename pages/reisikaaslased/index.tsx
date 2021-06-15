import React, {Fragment} from 'react'
import Header from "../../components/Header"
import {GetServerSideProps} from "next";
import axios from "axios";
import {useUser} from "../../context/AuthContext";

const TravelmatesIndex = (props: any) => {
    const item = props.content
    const user = useUser()

    console.log(user)

    return (
        <Fragment>
            <Header title={'Reisikaaslased'} />
            <div>
                <table style={{'border': '1px solid', 'margin': '0 auto', 'borderSpacing': '10px'}}>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{item.id}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{item.name}</td>
                        </tr>
                        <tr>
                            <td>Vol</td>
                            <td>{item.alcohol}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const url = 'https://random-data-api.com/api/beer/random_beer'
    const response = await axios.get(url)

    return {
        props: {
            content: response.data,
        }
    }
}

export default TravelmatesIndex