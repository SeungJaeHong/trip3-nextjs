import React from 'react'
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../../lib/ApiClientSSR"

const AdminDashboard = (props: any) => {
    return (
        <div>
            Dashboard
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const access = await ApiClientSSR(context).get('/admin')
        return {
            props: {}
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}

export default AdminDashboard
