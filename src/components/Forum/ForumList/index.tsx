import styles from './ForumList.module.scss'
import ForumRow from '../ForumRow'
import { ForumRowType } from '../../../types'
import Ads from '../../Ads'
import {Fragment} from "react";

type Props = {
    items: ForumRowType[]
    withAds: boolean
}

const ForumList = ({ items, withAds }: Props) => {
    const middle = withAds && items ? Math.floor(items?.length / 2) : undefined

    return (
        <div className={styles.ForumList}>
            {items?.map((item: ForumRowType, index: number) => {
                if (withAds && middle && middle === index) {
                    return (
                        <Fragment key={item.id}>
                            <div className={styles.ForumRow}>
                                <ForumRow {...item} />
                            </div>
                            <div className={styles.ForumRow}>
                                <Ads type={'body'} />
                            </div>
                        </Fragment>
                    )
                } else {
                    return (
                        <div className={styles.ForumRow} key={item.id}>
                            <ForumRow {...item} />
                        </div>
                    )
                }
            })}
        </div>
    )
}

ForumList.defaultProps = {
    withAds: false,
}

export default ForumList
