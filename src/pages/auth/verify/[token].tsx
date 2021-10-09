import React from "react"
import {GetServerSideProps} from "next";
import ApiClientSSR from "../../../lib/ApiClientSSR";
import Navbar from "../../../components/Navbar";
import containerStyle from "../../../styles/containers.module.scss";

const VerifyAccountPage = (props: any) => {
    return (
        <div className={containerStyle.ContainerXl}>
            <Navbar darkMode={true}/>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.query.token
    const user = await ApiClientSSR(context).get('/me').then(res => {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }).catch(err => {
        const verified = ApiClientSSR(context).post('/auth/verify', {token: token}).then(res => {
            console.log(res.data, 'SUCCESS')

            return {
                redirect: {
                    destination: '/login?verified=1',
                    permanent: false,
                },
            }
        }).catch(e => {

            console.log(e.response.status)

            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        })
    })

    /*return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    }*/

    return {
        props: {}
    }
}

export default VerifyAccountPage