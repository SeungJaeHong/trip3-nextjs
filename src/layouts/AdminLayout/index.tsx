import React from "react"
import styles from './AdminLayout.module.scss'
import Footer from "../../components/Footer"
import SidebarMenu from "../../components/Admin/SidebarMenu"
import Navbar from "../../components/Navbar"
import containerStyle from "../../styles/containers.module.scss"

type Props = {
    title?: string
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
                        {title &&
                            <h1 className={styles.Title}>
                                {title}
                            </h1>
                        }

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

export default AdminLayout