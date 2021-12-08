import React, {useEffect, useState} from "react"
import styles from "./UserMessages.module.scss"
import {UserMessage} from "../../../types"
import UserAvatar from "../UserAvatar"
import Tag from "../../Tag"
import {getMyMessages} from "../../../services/user.service"
import LoadingSpinner2 from "../../LoadingSpinner2"

const UserMessages = () => {
    const [messages, setMessages] = useState<UserMessage[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        getMyMessages().then((response) => {
            setMessages(response.data)
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className={styles.Loader}>
                <LoadingSpinner2 />
            </div>
        )
    }

    return (
        <div className={styles.UserMessages}>
            {messages.map(message => {
                return (
                    <div className={styles.MessageItem} key={message.id}>
                        <div className={styles.Avatar}>
                            <UserAvatar user={message.user} />
                        </div>
                        <div className={styles.Content}>
                            <div className={styles.UserNameContainer}>
                                <div className={styles.UserName}>
                                    <div>{message.user.name}</div>
                                </div>
                                <div className={styles.CreatedAt}>
                                    {message.unreadCount > 0 &&
                                        <Tag title={message.unreadCount === 1 ? message.unreadCount + ' uus' : message.unreadCount + ' uut'} red={true} />
                                    }
                                    {message.createdAt}
                                </div>
                            </div>
                            <div className={styles.Message}>
                                {message.message}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default UserMessages