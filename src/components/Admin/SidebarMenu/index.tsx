import React from "react"
import styles from "./SidebarMenu.module.scss"
import clsx from "clsx"
import TripLogo from "../../../icons/TripLogo"
import Link from "next/link"
import UsersIcon from "../../../icons/Admin/UsersIcon"
import PostIcon from "../../../icons/Admin/PostIcon"
import HomeIcon from "../../../icons/Admin/HomeIcon"
import HiddenContentIcon from "../../../icons/Admin/HiddenContentIcon"
import {useRouter} from "next/router"
import ContentMarketingIcon from "../../../icons/Admin/ContentMarketingIcon";

const SidebarMenu = () => {
    const router = useRouter()
    const isForumPage = () => {
        return router.route === '/admin/forum'
            || router.route === '/admin/forum/add'
            || router.route === '/admin/forum/[id]'
            || router.route === '/admin/forum/[id]/edit'
    }

    const isContentMarketingPage = () => {
        return router.route === '/admin/content-marketing'
            || router.route === '/admin/content-marketing/add'
            || router.route === '/admin/content-marketing/[id]'
            || router.route === '/admin/content-marketing/[id]/edit'
    }

    return (
        <div className={styles.SidebarMenu}>
            <div className={styles.Logo}>
                <Link href="/">
                    <a>
                        <TripLogo width={200} heigth={150} />
                    </a>
                </Link>
            </div>
            <div className={styles.Favicon}>
                <a href={'/'}>
                    <img src={'/favicons/favicon-96x96.png'} alt={'Trip.ee'} />
                </a>
            </div>
            <div className={styles.Menu}>
                {/*<div className={clsx(styles.MenuItem, {
                    [styles.Active]: router.route === "/admin/dashboard"
                })}>
                    <Link href="/admin/dashboard">
                        <a>
                            <HomeIcon />
                            <span className={styles.Title}>Avaleht</span>
                        </a>
                    </Link>
                </div>*/}
                <div className={clsx(styles.MenuItem, {
                    [styles.Active]: isForumPage()
                })}>
                    <Link href="/admin/forum">
                        <a>
                            <PostIcon />
                            <span className={styles.Title}>Foorum</span>
                        </a>
                    </Link>
                </div>
                <div className={clsx(styles.MenuItem, {
                    [styles.Active]: router.route === "/admin/users"
                })}>
                    <Link href="/admin/users">
                        <a>
                            <UsersIcon />
                            <span className={styles.Title}>Kasutajad</span>
                        </a>
                    </Link>
                </div>
                <div className={clsx(styles.MenuItem, {
                    [styles.Active]: router.route === "/admin/hidden"
                })}>
                    <Link href="/admin/hidden">
                        <a>
                            <HiddenContentIcon />
                            <span className={styles.Title}>Peidetud sisu</span>
                        </a>
                    </Link>
                </div>
                <div className={clsx(styles.MenuItem, {
                    [styles.Active]: isContentMarketingPage()
                })}>
                    <Link href="/admin/content-marketing">
                        <a>
                            <ContentMarketingIcon />
                            <span className={styles.Title}>Sisuturundus</span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SidebarMenu