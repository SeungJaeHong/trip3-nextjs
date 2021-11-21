import React from "react"
import styles from "./AdminHiddenContentTabs.module.scss"
import clsx from "clsx"
import {useRouter} from "next/router"

const AdminHiddenContentTabs = () => {
    const router = useRouter()
    const type = router.query?.type || 'forum'
    const tabs = [
        {
            title: 'Foorum',
            key: 'forum'
        },
        {
            title: 'Lennupakkumised',
            key: 'flights'
        },
        {
            title: 'Uudised',
            key: 'news'
        },
        {
            title: 'Reisikaaslased',
            key: 'travelmates'
        }
    ]

    return (
        <div className={styles.AdminHiddenContentTabs}>
            {tabs.map(tab => {
                return (
                    <div className={clsx(styles.Tab, {
                        [styles.Active]: type === tab.key
                    })} key={tab.key} onClick={() => router.push('/admin/hidden?type=' + tab.key)}>
                        {tab.title}
                    </div>
                )
            })}
        </div>
    )
}

export default AdminHiddenContentTabs