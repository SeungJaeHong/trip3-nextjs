import React from "react"
import styles from "./SidebarMenu.module.scss"
import clsx from "clsx"
import TripLogo from "../../../icons/TripLogo"
import Link from "next/link"
import UsersIcon from "../../../icons/Admin/UsersIcon";

const SidebarMenu = () => {
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
                <div className={styles.MenuItem}>
                    <Link href="/admin/foorum">
                        <a>
                            <UsersIcon />
                            <span className={styles.Title}>Foorum</span>
                        </a>
                    </Link>
                </div>
                <div className={styles.MenuItem}>
                    <Link href="/admin/users">
                        <a>
                            <UsersIcon />
                            <span className={styles.Title}>Kasutajad</span>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SidebarMenu