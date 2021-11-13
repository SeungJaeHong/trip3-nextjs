import React from "react"
import styles from "./SidebarMenu.module.scss"
import clsx from "clsx"
import TripLogo from "../../../icons/TripLogo"
import Link from "next/link"
import UsersIcon from "../../../icons/Admin/UsersIcon";
import CommentIcon from "../../../icons/Admin/CommentIcon";
import HomeIcon from "../../../icons/Admin/HomeIcon";
import HiddenContentIcon from "../../../icons/Admin/HiddenContentIcon";
import {useRouter} from "next/router";

const SidebarMenu = () => {
    const router = useRouter()
    return (
        <div className={styles.SidebarMenu}>
            <div className={styles.Logo}>
                <Link href="/">
                    <a>
                        <TripLogo width={200} heigth={150} />
                    </a>
                </Link>
            </div>
            <div className={styles.Menu}>
                <div className={clsx(styles.MenuItem, {
                    [styles.Active]: router.route === "/admin/dashboard"
                })}>
                    <Link href="/admin/dashboard">
                        <a>
                            <HomeIcon />
                            <span className={styles.Title}>Avaleht</span>
                        </a>
                    </Link>
                </div>
                <div className={clsx(styles.MenuItem, {
                    [styles.Active]: router.route === "/admin/forum"
                })}>
                    <Link href="/admin/forum">
                        <a>
                            <CommentIcon />
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
            </div>
        </div>
    )
}

export default SidebarMenu