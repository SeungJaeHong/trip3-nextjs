import React, {Fragment} from 'react'
import Header from "../../components/Header"
import {GetServerSideProps} from "next";
import axios from "axios";
import Footer from "../../components/Footer";

const FlightsIndex = (props: any) => {
    const item = props.content
    return (
        <Fragment>
            <Header title={'Lennupakkumised'} />
            <div>
                <table style={{'border': '1px solid', 'margin': '0 auto', 'borderSpacing': '10px'}}>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{item.id}</td>
                        </tr>
                        <tr>
                            <td>Strain</td>
                            <td>{item.strain}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{item.type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const url = 'https://random-data-api.com/api/cannabis/random_cannabis'
    const response = await axios.get(url)
    return {
        props: {
            content: response.data,
        }
    }
}

export default FlightsIndex