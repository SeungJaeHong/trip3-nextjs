import React from "react"
import styles from './AdminLayout.module.scss'
import Footer from "../../components/Footer"
import SidebarMenu from "../../components/Admin/SidebarMenu"

const AdminLayout = (props: any) => {
    return (
        <>
            <div className={styles.AdminLayout}>
                <div className={styles.SidebarMenu}>
                    <SidebarMenu />
                </div>
                <div className={styles.Content}>
                    {props.children}
                </div>
            </div>
            <Footer simple={true} />
        </>
    )
}

export default AdminLayout