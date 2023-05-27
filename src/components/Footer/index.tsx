import Link from 'next/link'
import TripTextLogo from '../../icons/TripTextLogo'
import styles from './Footer.module.scss'
import clsx from 'clsx'
import containerStyle from '../../styles/containers.module.scss'
import FacebookIcon from '../../icons/FacebookIcon'
import TwitterIcon from '../../icons/TwitterIcon'
import InstagramIcon from '../../icons/InstagramIcon'
import {useUser} from "../../hooks";
import RssIcon from "../../icons/RssIcon";

const col1 = [
    {
        title: 'Lennupakkumised',
        route: '/odavad-lennupiletid',
    },
    {
        title: 'Reisikaaslased',
        route: '/reisikaaslased',
    },
    {
        title: 'Uudised',
        route: '/uudised',
    },
    /*{
        title: 'Reisiblogid',
        route: '/'
    },*/
    {
        title: 'Reisipildid',
        route: '/reisipildid',
    },
    /*{
        title: 'Sihtkohad',
        route: '/sihtkohad'
    },*/
]

const col2 = [
    {
        title: 'Foorum',
        route: '/foorum/uldfoorum',
    },
    {
        title: 'Ost-müük',
        route: '/foorum/ost-muuk',
    },
    {
        title: 'Elu välismaal',
        route: '/foorum',
    },
]

const col3 = [
    {
        title: 'Mis on Trip',
        route: '/tripist',
    },
    {
        title: 'Kontakt',
        route: '/kontakt',
    },
    {
        title: 'Kasutustingimused',
        route: '/kasutustingimused',
    },
    {
        title: 'Privaatsustingimused',
        route: '/privaatsustingimused',
    },
    {
        title: 'Reklaam',
        route: '/reklaam',
    },
    {
        title: 'Logi sisse',
        route: '/login',
    },
    {
        title: 'Registreeri',
        route: '/register',
    },
]

const social = [
    {
        title: 'Facebook',
        route: 'https://www.facebook.com/tripeeee',
        icon: FacebookIcon,
    },
    {
        title: 'Twitter',
        route: 'https://twitter.com/trip_ee',
        icon: TwitterIcon,
    },
    {
        title: 'Instagram',
        route: 'https://www.instagram.com/trip.ee',
        icon: InstagramIcon,
    },
    {
        title: 'Lennupakkumiste RSS',
        route: '/odavad-lennupiletid/rss',
        icon: RssIcon
    },
    {
        title: 'Uudiste RSS',
        route: '/uudised/rss',
        icon: RssIcon
    },
]

type Props = {
    simple: boolean
}

const Footer = (props: Props) => {
    const { userIsLoggedIn } = useUser()
    /*let style = {}
    if (!props.simple) {
        style = {
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/images/footer_summer.webp)',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50% 90%',
        }
    }*/

    return (
        <div className={clsx(styles.Footer, {
                [styles.Simple]: props.simple,
            })}
            //style={style}
        >
            <div className={clsx([containerStyle.ContainerLg, styles.Content])}>
                <div className={styles.Col}>
                    <Link href={'/'}>
                        <a>
                            <TripTextLogo />
                        </a>
                    </Link>
                </div>
                <div className={styles.Col}>
                    {col1.map((item) => {
                        return (
                            <Link href={item.route} key={item.title}>
                                <a>{item.title}</a>
                            </Link>
                        )
                    })}
                </div>
                <div className={styles.Col}>
                    {col2.map((item) => {
                        return (
                            <Link href={item.route} key={item.title}>
                                <a>{item.title}</a>
                            </Link>
                        )
                    })}
                </div>
                <div className={styles.Col}>
                    {col3.map((item) => {
                        if ((item.route === '/login' || item.route === '/register') && userIsLoggedIn) {
                            return null
                        }

                        return (
                            <Link href={item.route} key={item.title}>
                                <a>{item.title}</a>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className={styles.SocialLinks}>
                {social.map((item) => {
                    const Icon = item.icon
                    return (
                        <Link href={item.route} key={item.title}>
                            <a target={'_blank'}>
                                <Icon />
                                <span>{item.title}</span>
                            </a>
                        </Link>
                    )
                })}
            </div>
            <div className={styles.CopyRight}>Copyright © 1998 - {new Date().getFullYear()}</div>
        </div>
    )
}

Footer.defaultProps = {
    simple: false,
}

export default Footer
