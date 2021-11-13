import React from "react"
import styles from './AdminLayout.module.scss'
import Footer from "../../components/Footer"
import SidebarMenu from "../../components/Admin/SidebarMenu"
import Navbar from "../../components/Navbar"

type Props = {
    title: string
    children: React.ReactNode
}

const AdminLayout = ({title, children}: Props) => {
    return (
        <>
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
            <Footer simple={true} />
        </>
    )
}

export default AdminLayout