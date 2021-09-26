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
    switch(type) {
        case 'buysell':
            url = '/foorum/ost-muuk'
            break;
        case 'expat':
            url = '/foorum/elu-valismaal'
            break;
        case 'misc':
            url = '/foorum/vaba-teema'
            break;
    }

    return url
}

export const getForumUrlByTypeAndSlug = (type: string, slug: string) => {
    let url = getForumUrlByType(type)
    return url + '/' + slug
}

export const setFormikErrors = (errorObject: any, setErrorFunction: any) => {
    const errors = Object.keys(errorObject)
    errors.map((item) => {
        setErrorFunction(item, errorObject[item].join('\r\n'))
    })
}