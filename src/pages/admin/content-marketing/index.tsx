import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../hoc/withAdminAuth"
import ContentItem from "../../../components/Admin/ContentMarketing/Item";
import styles from "./AdminContentMarketingPage.module.scss"
import Button from "../../../components/Button";

const AdminContentMarketingPage = () => {
    return (
        <AdminLayout>
            <div className={styles.Container}>
                <div className={styles.TitleContainer}>
                    <h1>Sisuturundus</h1>
                    <Button title={'Lisa uus'} className={styles.AddBtn} route={'/admin/content-marketing/add'}/>
                </div>
            </div>
            {/*<ContentItem />*/}
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminContentMarketingPage
