import { ContentMarketingPost as ContentMarketingPostType } from '../../../../types'
import styles from './AdminContentMarketingPost.module.scss'
import React, { useState } from 'react'
import EllipsisIcon from '../../../../icons/EllipsisIcon'
import { Switch, Menu } from '@mantine/core'
import TrashIcon from '../../../../icons/TrashIcon'
import EditIcon from '../../../../icons/EditIcon'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
    post: ContentMarketingPostType
    onActiveChange: (post: ContentMarketingPostType, checked: boolean) => void
}

const ContentMarketingPost = ({ post, onActiveChange }: Props) => {
    const [checked, setChecked] = useState(post.active)
    const router = useRouter()

    const onChange = (checked: boolean) => {
        onActiveChange(post, checked)
        setChecked(checked)
    }

    return (
        <div className={styles.Container}>
            <div className={styles.BgImage}>
                <Link href={'/sisuturundus/' + post.slug}>
                    <a>
                        <img src={post.backgroundImageUrl} alt={post.title} />
                    </a>
                </Link>
            </div>
            <div className={styles.BodyContainer}>
                <div className={styles.Body}>
                    <h3>
                        <Link href={'/sisuturundus/' + post.slug}>
                            <a>{post.title}</a>
                        </Link>
                    </h3>
                    <div className={styles.Meta}>
                        {post.createdAt} &nbsp;|&nbsp; {post.clientName}
                    </div>
                    <div className={styles.Preview}>{post.body}...</div>
                </div>
                <div className={styles.ActionButtons}>
                    <Switch
                        className={styles.ActiveButton}
                        size={'lg'}
                        checked={checked}
                        onChange={(event) => onChange(event.currentTarget.checked)}
                    />
                    <Menu
                        shadow="sm"
                        size={'sm'}
                        control={
                            <div>
                                <EllipsisIcon />
                            </div>
                        }
                        className={styles.ActionMenu}
                    >
                        <Menu.Item
                            icon={<EditIcon width={20} height={20} />}
                            onClick={() => router.push('/admin/content-marketing/' + post.id + '/edit')}
                        >
                            Muuda
                        </Menu.Item>
                        <Menu.Item icon={<TrashIcon width={20} height={20} />} disabled={true}>
                            Kustuta
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default ContentMarketingPost
