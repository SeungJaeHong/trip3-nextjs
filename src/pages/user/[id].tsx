import React, {Fragment, useState} from 'react'
import {GetServerSideProps} from 'next'
import styles from "./UserPage.module.scss"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import {UserProfile} from "../../types"
import ApiClientSSR from "../../lib/ApiClientSSR"
import containerStyle from "../../styles/containers.module.scss"
import UserProfileAvatar from "../../components/User/UserProfileAvatar"

type Props = {
    user: UserProfile
}

const UserPage = (props: Props) => {

    //console.log(props)

    return (
        <Fragment>
            <Header
                backgroundImage={'/images/user_page_bg.jpg'}
                className={styles.Header}
                style={{backgroundPosition: '50% 25%'}} />
            <div className={styles.BodyContainer}>
                <div className={containerStyle.ContainerLg}>
                    <div className={styles.Body}>
                        <div className={styles.Avatar}>
                            <UserProfileAvatar {...props.user} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id
    const url = process.env.API_BASE_URL + '/user/' + id
    const response = await ApiClientSSR(context).get(url)

    if (!response.data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            user: response.data
        }
    }
}

export default UserPage