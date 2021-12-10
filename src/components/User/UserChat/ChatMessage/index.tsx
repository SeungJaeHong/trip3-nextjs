import React from "react"
import styles from "./ChatMessage.module.scss"
import clsx from "clsx"
import {User, UserChatMessage} from "../../../../types";
import UserAvatar from "../../UserAvatar";

type Props = {
    message: UserChatMessage,
    me: User,
    userWith: User
}

const ChatMessage = ({message, me, userWith}: Props) => {
    return (
        <div className={styles.ChatMessage}>
            <div className={styles.UserImage}>
                <UserAvatar user={message.userFromId === me.id ? me : userWith} />
            </div>
            <div className={styles.Message}>
                {message.message}
            </div>
        </div>
    )
}

export default ChatMessage