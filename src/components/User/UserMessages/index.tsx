import React from "react"
import styles from "./UserMessages.module.scss"
import {UserMessage} from "../../../types"
import UserAvatar from "../UserAvatar"
import Tag from "../../Tag"

const UserMessages = ({messages}: {messages: UserMessage[]}) => {
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