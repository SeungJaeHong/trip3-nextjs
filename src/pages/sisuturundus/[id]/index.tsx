import React, { Fragment, useState } from 'react'
import {ContentMarketingFullPost} from "../../../types";
import {useUser} from "../../../hooks";
import {useRouter} from "next/router";
import {NextSeo} from "next-seo";
import Header from "../../../components/Header";
import containerStyle from '../../../styles/containers.module.scss'
import styles from '../ContentMarketingPage.module.scss'
import RelatedContentBlock from "../../../components/RelatedContentBlock";
import Footer from "../../../components/Footer";
import {GetServerSideProps} from "next";
import ApiClientSSR from "../../../lib/ApiClientSSR";
import clsx from "clsx";

type Props = {
    content: ContentMarketingFullPost
}

const ContentMarketingPage = ({ content }: Props) => {
    const [post, setPost] = useState<ContentMarketingFullPost>(content)
    const { userIsLoggedIn, user } = useUser()
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const router = useRouter()

    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | Sisuturundus'}
                description={post.title}
                openGraph={{
                    title: post.title,
                    description: 'Sisuturundus | ' + post.clientName,
                    images: [
                        {
                            url: post.backgroundImageUrl,
                            width: 1024,
                            height: undefined,
                            type: undefined,
                        },
                    ],
                }}
            />
            <Header backgroundImage={post.backgroundImageUrl ?? '/images/header.webp'}>
                <div className={clsx(containerStyle.CenteredContainer, styles.HeaderContainer)}>
                    <div className={styles.HeaderTitle}>{post.title}</div>
                    <div className={styles.DateAndUser}>
                        <a href={post.url} target={'_blank'} rel={'noreferrer'}>
                            <div className={styles.ClientLogo}>
                                <img src={post.clientLogoUrl} alt={post.clientName} />
                            </div>
                            <div className={styles.ClientName}>{post.clientName}</div>
                        </a>
                    </div>
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.BodyContainer}>
                    <div className={styles.BodyWithComments}>
                        <div className={styles.BodyWrapper}>
                            <div className={styles.Body} dangerouslySetInnerHTML={{ __html: post.body }} />
                        </div>
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.DescriptionBlock}>
                            <div className={styles.ClientSidebarLogo}>
                                <a href={post.url} target={'_blank'} rel={'noreferrer'}>
                                    <img src={post.clientLogoUrl} alt={post.clientName} />
                                </a>
                            </div>
                            <div className={styles.Description}>
                                Selle artikli sisu toimetavad Trip.ee koostööpartnerid.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RelatedContentBlock type={'travelmate'} />
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const slug = context.query.id
        let url = process.env.API_BASE_URL + '/content-marketing/' + slug
        const response = await ApiClientSSR(context).get(url)

        return {
            props: {
                content: response.data,
            },
        }
    } catch (e: any) {
        if (e?.response?.status === 500) {
            return {
                redirect: {
                    destination: '/500',
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

export default ContentMarketingPage
