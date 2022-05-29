import React, { useEffect, useRef, useState } from 'react'
import styles from './UserChat.module.scss'
import { User, UserChatMessage } from '../../../types'
import { getChatWithUser, sendMessageToUser } from '../../../services/user.service'
import LoadingSpinner from '../../LoadingSpinner'
import { useRouter } from 'next/router'
import { useUser } from '../../../hooks'
import clsx from 'clsx'
import ChatMessage from './ChatMessage'
import ArrowLeftIcon from '../../../icons/ArrowLeftIcon'
import UserAvatar from '../UserAvatar'
import SendIcon from '../../../icons/SendIcon'
import { toast } from 'react-toastify'

const UserChat = () => {
    const [messages, setMessages] = useState<UserChatMessage[]>([])
    const [message, setMessage] = useState<string>('')
    const [chatWithUser, setChatWithUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(true)
    const [sending, setSending] = useState<boolean>(false)
    const router = useRouter()
    const id = Number(router.query?.id)
    const { user } = useUser()
    const bodyRef = useRef<null | HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (id && user) {
            setLoading(false)
            getChatWithUser(id)
                .then((response) => {
                    setMessages(response.data.messages)
                    setChatWithUser(response.data.user)
                    setLoading(false)
                    bodyRef.current?.scrollBy({ top: bodyRef.current?.scrollHeight })
                })
                .catch((err) => {
                    setLoading(false)
                })
        }
    }, [id, user])

    const onChangeMessage = () => {
        setMessage(textareaRef.current?.value ?? '')
    }

    const onSendMessage = () => {
        if (!sending && chatWithUser && message.length) {
            setSending(true)
            sendMessageToUser(chatWithUser.id, message)
                .then((res) => {
                    const newMessages = [...messages, res.data]
                    setMessages(newMessages)
                    setMessage('')
                    bodyRef.current?.scrollBy({ top: bodyRef.current?.scrollHeight })
                    setSending(false)
                })
                .catch((err) => {
                    toast.error('Sõnumi saatmine ebaõnnestus')
                    setSending(false)
                })
        }
    }

    if (loading) {
        return (
            <div className={styles.Loader}>
                <LoadingSpinner />
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
                    <div className={styles.UserName}>{chatWithUser.name}</div>
                </div>
            </div>
            <div className={styles.Body} ref={bodyRef}>
                <div className={styles.List}>
                    {messages.map((message) => {
                        return (
                            <div
                                className={clsx(styles.MessageContainer, {
                                    [styles.MyMessage]: message.userFromId === user?.id,
                                })}
                                key={message.id}
                            >
                                <div className={styles.Message}>
                                    <ChatMessage message={message} me={user} userWith={chatWithUser} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.Footer}>
                <textarea
                    spellCheck={false}
                    placeholder={'Kirjuta sõnum...'}
                    ref={textareaRef}
                    onChange={onChangeMessage}
                    value={message}
                />
                <div className={styles.SendButton} onClick={onSendMessage}>
                    <SendIcon />
                </div>
            </div>
        </div>
    )
}

export default UserChat
