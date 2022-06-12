import React, { Fragment, useState } from 'react'
import Header from '../../../components/Header'
import { GetServerSideProps } from 'next'
import Footer from '../../../components/Footer'
import containerStyle from '../../../styles/containers.module.scss'
import styles from './TravelmatePage.module.scss'
import { Comment, Destination, Topic, TravelmateContent } from '../../../types'
import { useRouter } from 'next/router'
import ApiClientSSR from '../../../lib/ApiClientSSR'
import Link from 'next/link'
import Tag from '../../../components/Tag'
import UserAvatar from '../../../components/User/UserAvatar'
import { useUser } from '../../../hooks'
import ForumComment from '../../../components/Forum/ForumComment'
import BlockTitle from '../../../components/BlockTitle'
import CommentEditor from '../../../components/CommentEditor'
import { postComment } from '../../../services/comment.service'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import { toggleTravelmateStatus } from '../../../services/travelmate.service'
import Alert from '../../../components/Alert'
import RelatedContentBlock from '../../../components/RelatedContentBlock'
import Ads from '../../../components/Ads'
import { NextSeo } from 'next-seo'

type Props = {
    content: TravelmateContent
}

const TravelmatePage = ({ content }: Props) => {
    const [travelmate, setTravelmate] = useState<TravelmateContent>(content)
    const [commentValue, setCommentValue] = useState<string>('')
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[] | undefined>(content.comments)
    const { userIsLoggedIn, user } = useUser()
    const userIsOwner = content.user.id === user?.id
    const userIsAdmin = userIsLoggedIn && user?.isAdmin
    const router = useRouter()

    const onCommentSubmit = async (value: string) => {
        setSubmitting(true)
        await postComment(value, travelmate.id, 'travelmate')
            .then((response) => {
                setCommentValue(value)
                setCommentValue('')
                const comment = response.data
                const newComments = comments ? [...comments, comment] : [comment]
                setComments(newComments)
                toast.success('Kommentaar lisatud')
            })
            .catch((err) => {
                if (err.response?.status === 401) {
                    toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                } else if (err.response?.status === 422 && err.response?.data?.errors) {
                    toast.error('Kommentaari sisu on kohustuslik!')
                } else {
                    toast.error('Kommentaari lisamine ebaõnnestus')
                }
            })
            .finally(() => setSubmitting(false))
    }

    const onToggleStatus = () => {
        if (userIsAdmin) {
            const status = !travelmate.status
            toggleTravelmateStatus(travelmate, status)
                .then((res) => {
                    const newTravelmate = { ...travelmate, status: res.data }
                    setTravelmate(newTravelmate)
                    toast.success(newTravelmate.status === 1 ? 'Kuulutus avalikustatud' : 'Kuulutus peidetud')
                })
                .catch((err) => {
                    toast.error('Kuulutuse muutmine ebaõnnestus')
                })
        }
    }

    const renderAgeAndGender = () => {
        let value = undefined
        const gender = travelmate.user.gender ? (travelmate.user.gender === 1 ? 'M' : 'N') : undefined
        if (travelmate.user.age && gender) {
            value = gender + ', ' + travelmate.user.age
        } else if (travelmate.user.age) {
            value = travelmate.user.age
        } else if (gender) {
            value = gender
        }

        if (!value) {
            return null
        }

        return <div className={styles.UserAge}>({value})</div>
    }

    const renderActionButtons = () => {
        if (userIsAdmin) {
            return (
                <div className={styles.ActionButtons}>
                    <span
                        className={styles.ActionButton}
                        onClick={() => router.push('/reisikaaslased/' + travelmate.id + '/muuda')}
                    >
                        Muuda
                    </span>{' '}
                    /
                    <span className={styles.ActionButton} onClick={onToggleStatus}>
                        {travelmate.status === 1 ? 'Peida' : 'Avalikusta'}
                    </span>
                </div>
            )
        } else if (userIsOwner) {
            return (
                <div className={styles.ActionButtons}>
                    <span
                        className={styles.ActionButton}
                        onClick={() => router.push('/reisikaaslased/' + travelmate.id + '/muuda')}
                    >
                        Muuda
                    </span>
                </div>
            )
        }

        return null
    }

    const renderGender = () => {
        if (travelmate.gender === 'M' || travelmate.gender === 'N') {
            return travelmate.gender === 'M' ? 'Mees' : 'Naine'
        } else if (travelmate.gender === 'All') {
            return 'Kõik sobib'
        } else {
            return '-'
        }
    }

    const renderDestinations = () => {
        if (travelmate.destinations) {
            let hasMoreCount = undefined
            let destinations = travelmate.destinations
            if (destinations.length > 4) {
                hasMoreCount = '+' + (destinations.length - 3)
                destinations = destinations.slice(0, 3)
            }

            return (
                <>
                    {destinations?.map((destination: Destination) => {
                        return (
                            <Tag
                                title={destination.name}
                                type={'destination'}
                                route={'/sihtkoht/' + destination.slug}
                                key={destination.id}
                            />
                        )
                    })}
                    {hasMoreCount !== undefined && <Tag title={hasMoreCount} type={'destination'} />}
                </>
            )
        }

        return null
    }

    return (
        <Fragment>
            <NextSeo
                title={'Trip.ee | Reisikaaslased'}
                description={travelmate.description}
                openGraph={{
                    title: travelmate.title,
                    description: travelmate.description,
                }}
            />
            <Header>
                <div className={styles.PageTitleContainer}>
                    <div className={styles.PageTitle}>
                        Reisikaaslased
                        <Link href={'/reisikaaslased'}>
                            <a className={styles.MoreLink}>Vaata kõiki kuulutusi ›</a>
                        </Link>
                    </div>
                </div>
            </Header>
            <div className={containerStyle.ContainerXl}>
                <div className={styles.PageContentContainer}>
                    <div className={styles.PageContent}>
                        {travelmate.status === 0 && (
                            <div className={styles.Alert}>
                                <Alert title={'Kuulutus ei ole avalikustatud!'} type={'warning'} />
                            </div>
                        )}
                        <div className={styles.TravelmateTitle}>{travelmate.title}</div>
                        <div className={styles.MetaData}>
                            <div className={styles.CreatedAt}>Lisatud {travelmate.createdAt}</div>
                            <div className={styles.Tags}>
                                {renderDestinations()}
                                {travelmate.topics?.map((topic: Topic) => {
                                    return <Tag title={topic.name} key={topic.id} />
                                })}
                            </div>
                        </div>
                        <div
                            className={clsx(styles.Body, {
                                [styles.WithBodyMargin]: !(userIsOwner || userIsAdmin),
                            })}
                            dangerouslySetInnerHTML={{ __html: travelmate.body }}
                        />

                        {renderActionButtons()}

                        {comments && comments?.length > 0 && (
                            <div className={styles.Comments}>
                                {comments.map((comment: Comment) => {
                                    return <ForumComment key={comment.id} item={comment} type={'travelmate'} />
                                })}
                            </div>
                        )}

                        {userIsLoggedIn && (
                            <div className={styles.AddComment}>
                                <BlockTitle title={'Lisa kommentaar'} />
                                <CommentEditor
                                    id={'comment-editor'}
                                    onSubmit={onCommentSubmit}
                                    value={commentValue}
                                    submitButtonName={'Lisa kommentaar'}
                                    submitting={submitting}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.UserCard}>
                            <div className={styles.UserInfo}>
                                <div
                                    className={styles.UserAvatar}
                                    onClick={() => router.push('/user/' + travelmate.user.id)}
                                >
                                    <UserAvatar user={travelmate.user} />
                                </div>
                                <div className={styles.UserNameContainer}>
                                    <Link href={'/user/' + travelmate.user.id}>
                                        <a className={styles.UserName}>{travelmate.user.name}</a>
                                    </Link>
                                    {renderAgeAndGender()}
                                </div>
                            </div>
                            {userIsLoggedIn && travelmate.user.id !== user?.id && (
                                <div
                                    className={styles.SendButton}
                                    onClick={() => router.push('/profile/messages/' + travelmate.user.id)}
                                >
                                    Saada sõnum
                                </div>
                            )}
                        </div>
                        <div className={styles.InfoCard}>
                            <div className={styles.InfoBlock}>
                                <div className={styles.InfoQuestion}>Reisi algus</div>
                                <div className={styles.InfoAnswer}>{travelmate.startMonth ?? '-'}</div>
                            </div>
                            <div className={styles.InfoBlock}>
                                <div className={styles.InfoQuestion}>Reisi kestvus</div>
                                <div className={styles.InfoAnswer}>{travelmate.duration ?? '-'}</div>
                            </div>
                            <div className={styles.InfoBlock}>
                                <div className={styles.InfoQuestion}>Millist kaaslast soovid leida?</div>
                                <div className={styles.InfoAnswer}>{renderGender()}</div>
                            </div>
                        </div>
                        <div className={styles.Ads}>
                            <Ads type={'sidebar-small'} />
                            <Ads type={'sidebar-large'} />
                        </div>
                    </div>
                </div>
            </div>
            <RelatedContentBlock type={'travelmate'} />
            <Footer />
        </Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const slug = context.query.slug
        const url = process.env.API_BASE_URL + '/travelmate/' + slug
        const response = await ApiClientSSR(context).get(url)
        return {
            props: {
                content: response.data,
            },
        }
    } catch (e) {
        return {
            notFound: true,
        }
    }
}

export default TravelmatePage
