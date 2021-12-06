import React from "react"
import styles from "./UserMessages.module.scss"

const UserMessages = () => {
    return (
        <div className={styles.UserMessages}>
            <div className={styles.MessageItem}>
                message1
            </div>
            <div className={styles.MessageItem}>
                message2
            </div>
        </div>
    )
}

export default UserMessages