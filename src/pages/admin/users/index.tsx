import React from 'react'
import AdminLayout from "../../../layouts/AdminLayout"
import {withAdminAuth} from "../../../hoc/withAdminAuth"
import styles from './AdminUsers.module.scss'
import ModeratorGrid from "../../../components/Admin/Users/ModeratorGrid";
import UsersTable from "../../../components/Admin/Users/UsersTable";

const AdminUsersPage = () => {
    return (
        <AdminLayout>
            <div className={styles.Container}>
                <div className={styles.UsersTable}>
                    <h2>Kasutajad</h2>
                    <UsersTable />
                </div>
                <div className={styles.ModeratorGrid}>
                    <h2>Toimetus</h2>
                    <ModeratorGrid />
                </div>
            </div>
        </AdminLayout>
    )
}

export const getServerSideProps = withAdminAuth()
export default AdminUsersPage
