import React, {Fragment} from "react"
import Navbar from "../../../../components/Navbar"
import styles from './UserAddImagePage.module.scss'
import clsx from "clsx"
import Footer from "../../../../components/Footer"
import containerStyle from "../../../../styles/containers.module.scss"
import BackgroundMap from "../../../../components/BackgroundMap"
import {GetServerSideProps} from "next"
import ApiClientSSR from "../../../../lib/ApiClientSSR"
import MoreLink from "../../../../components/MoreLink"
import {Destination} from "../../../../types"

type Props = {
    destinations: Destination[]
}

const UserAddImagePage = ({destinations}: Props) => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>
                        Reisipildid
                    </div>
                </div>
                <div className={styles.Content}>
                    <div className={containerStyle.ContainerLg}>
                        <div className={styles.Body}>
                            <div className={styles.FormContainer}>
                                <div className={styles.Header}>
                                    Lisa uus reisipilt
                                </div>
                                <div className={styles.Form}>
                                    Form
                                </div>
                            </div>
                            <div className={styles.Sidebar}>
                                <div className={styles.ImageRules}>
                                    <h3>Hea teada</h3>
                                    <div className={styles.ImageRulesBody}>
                                        <p>
                                            Pildi suurus võib olla maksimaalselt <strong>5mb</strong>.
                                        </p>
                                        <p>
                                            Lubatud pildi laiendused: <strong>jpg, png, jpeg</strong>
                                        </p>
                                        <MoreLink route={'/kasutustingimused'} title={'Kasutustingimused'} medium={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer simple={false} />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id
    try {
        const url = process.env.API_BASE_URL + '/user/' + id + '/addImage'
        const response: any = await ApiClientSSR(context).get(url)

        return {
            props: {
                destinations: response.data.destinations || []
            }
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/user/' + id,
                permanent: false,
            },
        }
    }
}

export default UserAddImagePage