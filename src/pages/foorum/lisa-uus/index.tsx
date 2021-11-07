import React, {Fragment} from "react"
import Navbar from "../../../components/Navbar"
import styles from './NewForumTopic.module.scss'
import clsx from "clsx";
import Footer from "../../../components/Footer"
import containerStyle from "../../../styles/containers.module.scss"
import BackgroundMap from "../../../components/BackgroundMap";
import {GetServerSideProps} from "next";
import ApiClientSSR from "../../../lib/ApiClientSSR";
import MoreLink from "../../../components/MoreLink";
import ForumPostForm from "../../../components/Forum/ForumPostForm";
import {Destination, Topic} from "../../../types";

type Props = {
    destinations: Destination[]
    topics: Topic[]
}

const CreateNewForumTopicPage = ({destinations, topics}: Props) => {
    return (
        <Fragment>
            <div className={styles.Container}>
                <BackgroundMap />
                <div className={containerStyle.ContainerXl}>
                    <div className={clsx(styles.Navbar)}>
                        <Navbar darkMode={true} />
                    </div>
                    <div className={styles.Title}>
                        Foorum
                    </div>
                </div>
                <div className={styles.Content}>
                    <div className={containerStyle.ContainerXl}>
                        <div className={styles.Body}>
                            <div className={styles.FormContainer}>
                                <div className={styles.Header}>
                                    Alusta uut teemat
                                </div>
                                <div className={styles.Form}>
                                    <ForumPostForm
                                        destinations={destinations}
                                        topics={topics} />
                                </div>
                            </div>
                            <div className={styles.Sidebar}>
                                <div className={styles.ForumRules}>
                                    <h3>Hea teada</h3>
                                    <div className={styles.ForumRulesBody}>
                                        <p>
                                            Ole hea ja uuri enne postitamist Trip.ee otsinguga juba olemasolevaid teemasid ning palun pane postitusele selle sisu avav pealkiri (mitte piirdudes koha või riigi nimega).
                                        </p>
                                        <p>
                                            Austan eesti keele reegleid, jälgin, et minu kirjutised oleksid loetavad. Ma ei kasuta slängi, suurtähti ja korduvaid kirjavahemärke ning kasutan suuri algustähti lause alguses ja kohanimedes.
                                        </p>
                                        <p>
                                            Ma ei avalda reklaamisisuga teateid, selleks kasutan Trip.ee <a href={'/reklaam'}>reklaamivõimalust.</a>
                                        </p>
                                        <p>
                                            Tean ja nõustun, et kasutustingimuste rikkumisel võidakse minu kasutajakonto ilma hoiatamata sulgeda ja/või minu ligipääs Trip.ee'le blokeerida.
                                        </p>
                                        <MoreLink route={'/kasutustingimused'} title={'Kasutustingimused'} medium={true}/>
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
    try {
        const response: any = await ApiClientSSR(context).get('/forum/create')
        return {
            props: {
                destinations: response.data.destinations || [],
                topics: response.data.topics || []
            }
        }
    } catch (e) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
}

export default CreateNewForumTopicPage