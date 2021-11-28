import Link from 'next/link'
import TripTextLogo from "../../icons/TripTextLogo"
import RssIcon from "../../icons/RssIcon"
import styles from './Footer.module.scss'
import clsx from "clsx"
import containerStyle from "../../styles/containers.module.scss"
import FacebookIcon from "../../icons/FacebookIcon"
import TwitterIcon from "../../icons/TwitterIcon"

const col1 = [
    {
        title: 'Lennupakkumised',
        route: '/odavad-lennupiletid'
    },
    {
        title: 'Reisikaaslased',
        route: '/reisikaaslased'
    },
    {
        title: 'Uudised',
        route: '/uudised'
    },
    {
        title: 'Reisiblogid',
        route: '/'
    },
    {
        title: 'Reisipildid',
        route: '/'
    },
    {
        title: 'Sihtkohad',
        route: '/'
    },
];

const col2 = [
    {
        title: 'Foorum',
        route: '/foorum/uldfoorum'
    },
    {
        title: 'Ost-müük',
        route: '/foorum/ost-muuk'
    },
    {
        title: 'Elu välismaal',
        route: '/foorum'
    },
];

const col3 = [
    {
        title: 'Mis on Trip',
        route: '/tripist'
    },
    {
        title: 'Kontakt',
        route: '/'
    },
    {
        title: 'Kasutustingimused',
        route: '/kasutustingimused'
    },
    {
        title: 'Privaatsustingimused',
        route: '/privaatsustingimused'
    },
    {
        title: 'Reklaam',
        route: '/'
    },
    {
        title: 'Logi sisse',
        route: '/'
    },
    {
        title: 'Registreeri',
        route: '/'
    },
];

const social = [
    {
        title: 'Facebook',
        route: '/',
        icon: FacebookIcon
    },
    {
        title: 'Twitter',
        route: '/',
        icon: TwitterIcon
    },
    {
        title: 'Lennupakkumiste RSS',
        route: '/',
        icon: RssIcon
    },
    {
        title: 'Uudiste RSS',
        route: '/',
        icon: RssIcon
    },
];

type Props = {
    simple: boolean
}

const Footer = (props: Props) => {
    let style = {}
    if (!props.simple) {
        style = {
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/images/footer5.jpg)",
            width: "100%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "50% 50%"
        }
    }

    return (
        <div className={clsx(styles.Footer, {
            [styles.Simple]: props.simple
        })} style={style}>
            <div className={clsx([containerStyle.ContainerLg, styles.Content])}>
                <div className={styles.Col}>
                    <Link href={'/'}>
                        <a>
                            <TripTextLogo />
                        </a>
                    </Link>
                </div>
                <div className={styles.Col}>
                    {col1.map(item => {
                        return (
                            <Link href={item.route} key={item.title}>
                                <a>
                                    {item.title}
                                </a>
                            </Link>
                        )
                    })}
                </div>
                <div className={styles.Col}>
                    {col2.map(item => {
                        return (
                            <Link href={item.route} key={item.title}>
                                <a>
                                    {item.title}
                                </a>
                            </Link>
                        )
                    })}
                </div>
                <div className={styles.Col}>
                    {col3.map(item => {
                        return (
                            <Link href={item.route} key={item.title}>
                                <a>
                                    {item.title}
                                </a>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className={styles.SocialLinks}>
                {social.map(item => {
                    const Icon = item.icon
                    return (
                        <Link href={item.route} key={item.title}>
                            <a>
                                <Icon />
                                {item.title}
                            </a>
                        </Link>
                    )
                })}
            </div>
            <div className={styles.CopyRight}>
                Copyright © 1998 - {new Date().getFullYear()}
            </div>
        </div>
    )
}

Footer.defaultProps = {
    simple: false,
}

export default Footer