export const objectToQueryString = (obj: any) => {
    const str = []
    for (const p in obj) {
        if (obj.hasOwnProperty(p) && obj[p]) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
    }

    return str.join('&')
}

export const getForumUrlByTypeAndSlug = (type: string, slug: string) => {
    let url = '/foorum/uldfoorum/' + slug
    switch(type) {
        case 'buysell':
            url = '/foorum/ost-muuk/' + slug
            break;
        case 'expat':
            url = '/foorum/elu-valismaal/' + slug
            break;
        case 'misc':
            url = '/foorum/vaba-teema/' + slug
            break;
    }

    return url
}