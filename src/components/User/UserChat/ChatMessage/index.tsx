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
        <div className={clsx(styles.ChatMessage, {
            [styles.MyMessage]: message.userFromId === me.id
        })}>
            <div className={styles.CreatedAt}>
                {message.createdAt}
            </div>
            <div className={styles.MessageContainer}>
                <div className={styles.UserImage}>
                    <UserAvatar user={message.userFromId === me.id ? me : userWith} />
                </div>
                <div className={styles.Message} dangerouslySetInnerHTML={{__html: message.message}} />
            </div>
        </div>
    )
}

export default ChatMessage