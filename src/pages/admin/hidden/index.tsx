import React from 'react'
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../../lib/ApiClientSSR"
import AdminLayout from "../../../layouts/AdminLayout"

const AdminHiddenContentPage = (props: any) => {
    return (
        <AdminLayout title={'Peidetud sisu'}>
            <div>
                Hidden content
            </div>
        </AdminLayout>
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

export default AdminHiddenContentPage
