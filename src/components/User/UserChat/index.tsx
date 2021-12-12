import React, {useEffect, useRef, useState} from "react"
import styles from "./UserChat.module.scss"
import {User, UserChatMessage} from "../../../types"
import {getChatWithUser} from "../../../services/user.service"
import LoadingSpinner2 from "../../LoadingSpinner2"
import {useRouter} from "next/router"
import useUser from "../../../hooks"
import clsx from "clsx"
import ChatMessage from "./ChatMessage"
import ArrowLeftIcon from "../../../icons/ArrowLeftIcon"
import UserAvatar from "../UserAvatar"

const UserChat = () => {
    const [messages, setMessages] = useState<UserChatMessage[]>([])
    const [chatWithUser, setChatWithUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const id = Number(router.query?.id)
    const { user } = useUser()
    const bodyRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        if (id && user) {
            setLoading(false)
            getChatWithUser(id).then((response) => {
                setMessages(response.data.messages)
                setChatWithUser(response.data.user)
                setLoading(false)
                bodyRef.current?.scrollBy({top: bodyRef.current?.scrollHeight})
            }).catch(err => {
                setLoading(false)
            })
        }
    }, [id, user])

    if (loading) {
        return (
            <div className={styles.Loader}>
                <LoadingSpinner2 />
            </div>
        )
    }

    if (!user || !chatWithUser) {
        return null
    }

    return (
        <div className={styles.UserChat}>
            <div className={styles.Header}>
                <div className={styles.Back} onClick={() => router.push('/profile/messages')}>
                    <ArrowLeftIcon />
                    <span className={styles.BackText}>Tagasi</span>
                </div>
                <div className={styles.WithUser}>
                    <div className={styles.Avatar}>
                        <UserAvatar user={chatWithUser} />
                    </div>
                    <div className={styles.UserName}>
                        {chatWithUser.name}
                    </div>
                </div>
            </div>
            <div className={styles.Body} ref={bodyRef}>
                <div className={styles.List}>
                    {messages.map(message => {
                        return (
                            <div className={clsx(styles.MessageContainer, {
                                [styles.MyMessage]: message.userFromId === user?.id
                            })} key={message.id}>
                                <div className={styles.Message}>
                                    <ChatMessage
                                        message={message}
                                        me={user}
                                        userWith={chatWithUser} />
                                </div>
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