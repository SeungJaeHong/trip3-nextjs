import Link from 'next/link'
import TripLogoText from "./icons/TripLogoText";
import RssIcon from "./icons/RssIcon";

const col1 = [
    {
        title: 'Lennupakkumised',
        route: '/lennupakkumised'
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
        route: '/'
    },
    {
        title: 'Kontakt',
        route: '/'
    },
    {
        title: 'Kasutustingimused',
        route: '/'
    },
    {
        title: 'Privaatsustingimused',
        route: '/'
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
        route: '/'
    },
    {
        title: 'Twitter',
        route: '/'
    },
    {
        title: 'Lennupakkumiste RSS',
        route: '/'
    },
    {
        title: 'Uudiste RSS',
        route: '/'
    },
];

const Footer = (props: any) => {
    return (
        <div className="pt-12 pb-24 pl-6 pr-6 bg-gray-100">
            <div className="container grid justify-center gap-4 text-center lg:mx-auto grid-cols-0 md:grid-cols-4 md:justify-start md:text-left">
                <Link href={'/'}>
                    <a>
                        <TripLogoText className="h-6 fill-current text-gray-600"/>
                    </a>
                </Link>
                <div className="grid gap-6 auto-rows-max">
                    {col1.map(item => {
                        return (
                            <Link href={item.route} key={item.title}>
                                <a className="text-base font-medium text-gray-600">
                                    {item.title}
                                </a>
                            </Link>
                        )
                    })}
                </div>
                <div className="grid gap-6 auto-rows-max">
                    {col2.map(item => {
                        return (
                            <Link href={item.route} key={item.title}>
                                <a className="text-base font-medium text-gray-600">
                                    {item.title}
                                </a>
                            </Link>
                        )
                    })}
                </div>
                <div className="grid gap-6 auto-rows-max">
                    {col3.map(item => {
                        return (
                            <Link href={item.route} key={item.title}>
                                <a className="text-base font-medium text-gray-600">
                                    {item.title}
                                </a>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className="h-16" />
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                {social.map(item => {
                    return (
                        <Link href={item.route} key={item.title}>
                            <a className="flex items-center gap-2 text-sm text-gray-600 text-base font-medium">
                                <RssIcon className="hidden w-4 h-4 md:block fill-current text-gray-600" />
                                {item.title}
                            </a>
                        </Link>
                    )
                })}
            </div>
            <div className="h-12" />
            <div className="text-base text-center text-gray-400">
                Copyright © 1998 - {new Date().getFullYear()}
            </div>
        </div>
    )
}

export default Footer