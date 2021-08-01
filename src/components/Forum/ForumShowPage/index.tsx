import {Content} from "../../../types"
import React, {Fragment} from "react"
import Header from "../../Header";
import styles from "./ForumShowPage.module.scss"
import containerStyle from "../../../styles/containers.module.scss"
import ForumPost from "../ForumPost"
import MoreLink from "../../MoreLink"
import ForumPostComments from "../ForumPostComments"
import Footer from "../../Footer"

type Props = {
    post: Content,
    currentPage: number,
    lastPage: number
}

const ForumShowPage = (props: Props) => {
    return (
        <Fragment>
            <Header withBackgroundMap={true} className={styles.Header} />
            <div className={containerStyle.ContainerXl}>
                {/*<div className={containerStyle.CenteredContainer}>*/}
                <div className={styles.Content}>
                    <div className={styles.ForumContent}>
                        <div className={styles.ForumPost}>
                            <ForumPost {...props.post} />
                        </div>
                        {props.post.comments?.length ? <div className={styles.LatestCommentLink}>
                            <MoreLink route={'/'} title={'Mine uusima kommentaari juurde'} />
                        </div> : null}
                        <ForumPostComments
                            post={props.post}
                            comments={props.post.comments}
                            currentPage={props.currentPage}
                            lastPage={props.lastPage} />
                    </div>
                    <div className={styles.Sidebar}>
                        Sidebar
                    </div>
                </div>
                {/*</div>*/}
            </div>
            <Footer />
        </Fragment>
    )
}

export default ForumShowPage