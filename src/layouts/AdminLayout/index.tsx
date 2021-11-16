import React from "react"
import styles from './AdminLayout.module.scss'
import Footer from "../../components/Footer"
import SidebarMenu from "../../components/Admin/SidebarMenu"
import Navbar from "../../components/Navbar"
import containerStyle from "../../styles/containers.module.scss"
import {GetServerSideProps} from "next";
import ApiClientSSR from "../../lib/ApiClientSSR";

type Props = {
    title: string
    children: React.ReactNode
}

const AdminLayout = ({title, children}: Props) => {
    return (
        <div className={containerStyle.ContainerXl}>
            <div className={styles.AdminLayout}>
                <div className={styles.SidebarMenu}>
                    <SidebarMenu />
                </div>
                <div className={styles.ContentContainer}>
                    <div className={styles.NavBar}>
                        <Navbar
                            darkMode={true}
                            showLogo={false} />
                    </div>
                    <div className={styles.Content}>
                        <h1 className={styles.Title}>
                            {title}
                        </h1>
                        {children}
                    </div>
                </div>
            </div>
            <div className={styles.Footer}>
                <Footer simple={true} />
            </div>
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

export default AdminLayout