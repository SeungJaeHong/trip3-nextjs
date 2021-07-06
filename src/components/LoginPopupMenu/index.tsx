import {useState} from "react"
import { useRouter } from 'next/router'
import clsx from "clsx"
import styles from "./LoginPopupMenu.module.scss"

const LoginPopupMenu = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const onMenuItemClick = (href: string) => {
        router.push(href)
        setOpen(false)
    }

    return (
        <div className={styles.LoginPopupMenu} onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <span className={styles.LinkTitle}>
                Minu Trip.ee
            </span>
            <div className={clsx(styles.PopUpMenu, {
                [styles.Open]: open
            })} onMouseLeave={() => setOpen(false)}>
                <div className={styles.ArrowWrapper}>
                    <div className={styles.Arrow} />
                </div>
                <div className={styles.Links}>
                    <div className={styles.LinkWrapper} onClick={() => onMenuItemClick('/login')}>
                        <span className={styles.Link}>Logi sisse</span>
                    </div>
                    <div className={styles.LinkWrapper} onClick={() => onMenuItemClick('/register')}>
                        <span className={styles.Link}>Registreeri</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPopupMenu