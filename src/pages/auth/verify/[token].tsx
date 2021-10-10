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
    try {
        const token = context.query.token
        const verified = await ApiClientSSR(context).post('/auth/verify', {token: token});
        return {
            redirect: {
                destination: '/login?verified=1',
                permanent: false,
            },
        }
    } catch (e: any) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}

export default VerifyAccountPage