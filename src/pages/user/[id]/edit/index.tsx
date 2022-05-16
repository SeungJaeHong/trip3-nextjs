import React, { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import styles from './UserEditPage.module.scss'
import { UserPublicProfile } from '../../../../types'
import Footer from '../../../../components/Footer'
import ApiClientSSR from '../../../../lib/ApiClientSSR'
import BackgroundMap from '../../../../components/BackgroundMap'
import containerStyle from '../../../../styles/containers.module.scss'
import clsx from 'clsx'
import Navbar from '../../../../components/Navbar'
import UserEditForm from '../../../../components/User/UserEditForm'
import { NextSeo } from 'next-seo'

type Props = {
    user: UserPublicProfile
}

const UserEditPage = ({ user }: Props) => {
    return (
        <Fragment>
            <NextSeo nofollow={true} noindex={true} />
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>Muuda profiili</div>
                    <div className={styles.Form}>
                        <UserEditForm {...user} />
                    </div>
                </div>
            </div>
            <Footer simple={true} />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const id = context.query.id
        const url = process.env.API_BASE_URL + '/user/' + id + '/edit'
        const response = await ApiClientSSR(context).get(url)

        if (!response.data) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                user: response.data,
            },
        }
    } catch (e: any) {
        if (e.response?.status === 401 || e.response?.status === 403) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        } else {
            return {
                notFound: true,
            }
        }
    }
}

export default UserEditPage
