import React, {useEffect, useState} from "react"
import styles from "./UserChat.module.scss"
import {UserMessage} from "../../../types"
import UserAvatar from "../UserAvatar"
import {getMyMessages} from "../../../services/user.service"
import LoadingSpinner2 from "../../LoadingSpinner2"

const UserChat = () => {
    const [messages, setMessages] = useState<UserMessage[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        /*setLoading(true)
        getMyMessages().then((response) => {
            setMessages(response.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })*/
    }, [])

    if (loading) {
        return (
            <div className={styles.Loader}>
                <LoadingSpinner2 />
            </div>
        )
    }

    return (
        <div className={styles.UserChat}>
            <div className={styles.Header}>
                Header
            </div>
            <div className={styles.Body}>
                <div className={styles.List}>
                    {Array.from(Array(10).keys()).map(item => {
                        return (
                            <div className={styles.Item} key={item}>
                                Message
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.Footer}>
                <textarea spellCheck={false} placeholder={'Kirjuta sõnum...'} />
            </div>
        </div>
    )
}

export default UserChat