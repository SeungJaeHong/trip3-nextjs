import { UseFormSetError } from 'react-hook-form'

export const objectToQueryString = (obj: any) => {
    const str = []
    for (const p in obj) {
        if (obj.hasOwnProperty(p) && obj[p]) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
    }

    return str.join('&')
}

export const getForumUrlByType = (type: string) => {
    let url = '/foorum/uldfoorum'
    switch (type) {
        case 'buysell':
            url = '/foorum/ost-muuk'
            break
        case 'expat':
            url = '/foorum/elu-valismaal'
            break
        case 'misc':
            url = '/foorum/vaba-teema'
            break
    }

    return url
}

export const getForumUrlByTypeAndSlug = (type: string, slug: string) => {
    let url = getForumUrlByType(type)
    return url + '/' + slug
}

export const setFormErrors = (errorObject: any, setError: UseFormSetError<any>) => {
    const errors = Object.keys(errorObject)
    errors.map((field) => {
        setError(field, {
            type: 'manual',
            message: errorObject[field].join('\r\n'),
        })
    })
}

export const scrollToHash = () => {
    const hashId = window.location.hash?.replace('#', '')
    if (hashId) {
        const element = document.getElementById(hashId)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
            })
        }
    }
}

export const getNext12MonthNamesWithYear = () => {
    const now = new Date()
    let month = now.getMonth()
    let year = now.getFullYear()

    const names = [
        'Jaanuar',
        'Veebruar',
        'Märts',
        'Aprill',
        'Mai',
        'Juuni',
        'Juuli',
        'August',
        'September',
        'Oktoober',
        'November',
        'Detsember',
    ]

    let res = []
    for (let i = 0; i < 12; ++i) {
        res.push({
            value: month + 1 + '_' + year,
            label: names[month] + ' ' + year,
        })

        if (++month === 12) {
            month = 0
            ++year
        }
    }

    return res
}
