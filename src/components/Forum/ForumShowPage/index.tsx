import {Content} from "../../../types"
import React, {Fragment, useState} from "react"
import Router from 'next/router'
import Header from "../../Header";
import styles from "./ForumShowPage.module.scss"
import containerStyle from "../../../styles/containers.module.scss"
import ForumPost from "../ForumPost"
import MoreLink from "../../MoreLink"
import ForumPostComments from "../ForumPostComments"
import Footer from "../../Footer"
import Button from "../../Button"
import {getForumUrlByType, getForumUrlByTypeAndSlug} from "../../../helpers"
import CommentEditor from "../../CommentEditor"
import BlockTitle from "../../BlockTitle"
import {postComment} from "../../../services/forum.service";
import {toast} from "react-hot-toast";
import {useAppSelector} from "../../../hooks";
import {selectUserIsLoggedIn} from "../../../redux/auth";

type Props = {
    post: Content,
    currentPage: number,
    lastPage: number
}

const ForumShowPage = ({post, currentPage, lastPage}: Props) => {
    const userIsLoggedIn = useAppSelector(selectUserIsLoggedIn)
    const [commentValue, setCommentValue] = useState('')

    const onSubmit = async (value: string) => {
        const res = await postComment(value, post.id).then((response) => {
            setCommentValue('')
            toast.success('Kommentaar lisatud')

            console.log(response.data, 'data')

            const url = getForumUrlByTypeAndSlug(post.type, post.slug)
            Router.replace(url + '#' + response.data.commentId)
            //Router.replace(Router.asPath)
        }).catch(err => {
            if (err.response.status === 401) {
                toast.error('Sessioon on aegunud. Palun logi uuesti sisse')
                const url = getForumUrlByTypeAndSlug(post.type, post.slug)
                Router.push(url)
            } else {
                toast.error('Kommentaari lisamine ebaõnnestus')
            }
        })
    }

    return (
        <Fragment>
            <Header withBackgroundMap={true} className={styles.Header} />
            <div className={containerStyle.ContainerXl}>
                {/*<div className={containerStyle.CenteredContainer}>*/}
                <div className={styles.Content}>
                    <div className={styles.ForumContent}>
                        <div className={styles.ForumPost}>
                            <ForumPost {...post} />
                        </div>
                        {post.comments?.length ? <div className={styles.LatestCommentLink}>
                            <MoreLink route={'/'} title={'Mine uusima kommentaari juurde'} />
                        </div> : null}
                        <ForumPostComments
                            post={post}
                            comments={post.comments}
                            currentPage={currentPage}
                            lastPage={lastPage} />
                        {userIsLoggedIn &&
                            <div className={styles.AddComment}>
                                <BlockTitle title={'Lisa kommentaar'} />
                                <CommentEditor
                                    onSubmit={onSubmit}
                                    value={commentValue} />
                            </div>
                        }
                    </div>
                    <div className={styles.Sidebar}>
                        <div className={styles.SidebarButton}>
                            <Button title={'Otsi foorumist'} light={true} route={getForumUrlByType(post.type)} />
                        </div>
                        <div className={styles.SidebarButton}>
                            <Button title={'Alusta uut teemat'} light={true} route={'/'} />
                        </div>
                        {/*<div className={styles.ForumLinks}>
                            <div className={styles.ForumLink}>
                                <MoreLink title={'Üldfoorum'} route={'/'} large={true} />
                            </div>
                            <div className={styles.ForumLink}>
                                <MoreLink title={'Ost-müük'} route={'/'} large={true} />
                            </div>
                            <div className={styles.ForumLink}>
                                <MoreLink title={'Elu välismaal'} route={'/'} large={true} />
                            </div>
                            <div className={styles.ForumLink}>
                                <MoreLink title={'Vaba teema'} route={'/'} large={true} />
                            </div>
                            <div className={styles.ForumLink}>
                                <MoreLink title={'Minu jälgimised'} route={'/'} large={true} />
                            </div>
                        </div>*/}
                    </div>
                </div>
                {/*</div>*/}
            </div>
            <Footer />
        </Fragment>
    )
}

export default ForumShowPage