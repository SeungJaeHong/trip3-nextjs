export interface User {
    id: number
    name: string
    rank: number
    isAdmin: boolean
    avatar?: string
}

export interface UserPublicProfile extends User {
    age?: number
    gender?: number
    rankName: string
    joinedDate: string
    description?: string
    liked: number
    disliked: number
    postCount: number
    commentCount: number
    placesVisited: number
    countriesVisited?: Destination[]
    citiesVisited?: Destination[]
    wantsToGo?: Destination[]
    countryPercentage: number
}

export interface UserProfile extends User {
    email?: string
    contact_facebook?: string
    contact_twitter?: string
    contact_instagram?: string
    contact_homepage?: string
    age?: number
    gender?: number
    birthYear?: number
    description?: string
    notify_message?: boolean
    notify_follow?: boolean
}

export interface UserMessage {
    id: number
    user: User
    message: string
    createdAt: string
    unreadCount: number
}

export interface UserChatMessage {
    id: number
    userFromId: number
    userToId: number
    message: string
    createdAt: string
}

export interface Destination {
    id: number
    name: string
    slug: string
    parentDestination?: Destination
    isContinent: boolean
    isCountry: boolean
    lat?: number
    lng?: number
}

export interface Topic {
    id: number
    name: string
}

export interface Tag {
    id: number
    name: string
}

export interface Comment {
    id: number
    commentableId: number
    commentableType: string
    user: User
    body: string
    status: number
    likes: number
    dislikes: number
    hasTimeToEdit: boolean
    createdAt: string
    updatedAt: string
}

export interface UserComment extends Comment {
    content: {
        title: string
        type: string
        url: string
    }
}

export interface Image {
    id: number
    title: string
    slug: string
    urlSmall: string
    urlSmallSquare: string
    urlLarge: string
    createdAt: string
    user?: User
    destinations?: Destination[]
}

export interface ForumPostType {
    id: number
    title: string
    description: string
    body: string
    type: string
    slug: string
    url?: string
    status: number
    createdAt: string
    updatedAt?: string
    likes?: number
    dislikes?: number
    following: boolean
    user: User
    comments?: Comment[]
    destinations?: Destination[]
    topics?: Topic[]
}

export type FlightContent = {
    id: number
    title: string
    description: string
    body: string
    bodyRaw: string
    slug: string
    status: number
    createdAt: string
    backgroundImageUrl: string
    socialImgUrl: string
    destinations?: Destination[]
    tags?: Tag[]
}

export type NewsContent = {
    id: number
    title: string
    description: string
    body: string
    bodyRaw: string
    slug: string
    status: number
    createdAt: string
    backgroundImageUrl: string
    socialImgUrl: string
    user: User
    destinations?: Destination[]
    topics?: Topic[]
    comments?: Comment[]
}

export type DestinationContent = {
    id: number
    name: string
    slug: string
    backgroundImageUrl: string
    description?: string
    descriptionPreview?: string
    parentDestination?: Destination
    nextDestination?: Destination
    previousDestination?: Destination
    childDestinations?: Destination[]
    usersHaveBeen?: number
    usersWantsToGo?: number
    flights?: FlightOfferCardType[]
    forumPosts?: ForumRowType[]
    facts: {
        phoneCode?: string
        area?: number
        currency?: string
        population?: number
        timezone?: string
    }
    isContinent: boolean
    isCountry: boolean
    lat?: number
    lng?: number
}

export type TravelmateContent = {
    id: number
    title: string
    description: string
    body: string
    slug: string
    status: number
    startType: 'start' | 'start_and_end'
    gender?: 'M' | 'N'
    startDate?: string
    endDate?: string
    startMonth?: string
    duration?: string
    createdAt: string
    user: UserProfile
    destinations?: Destination[]
    topics?: Topic[]
    comments?: Comment[]
}

export type ForumRowType = {
    id: number
    title: string
    type: string
    url: string
    updatedAt: string
    isNew: boolean
    unreadCommentsCount: number
    firstUnreadCommentUrl?: string
    viewsCount: number
    commentsCount: number
    user: User
    destinations?: Destination[]
    topics?: Topic[]
}

export type ForumRowHiddenType = {
    id: number
    title: string
    type: string
    url: string
    createdAt: string
    userId: number
    userName: string
}

export type NewsCardType = {
    id: number
    title: string
    slug: string
    imageUrl: string
    createdAt: string
    createdAtRaw: string
    commentsCount: number
}

export type NewsRowType = {
    id: number
    title: string
    slug: string
    imageUrl: string
    createdAt: string
    destinations?: Destination[]
    topics?: Topic[]
}

export type ShortNewsListItemType = {
    id: number
    title: string
    slug: string
    createdAt: string
}

export type FlightOfferRowType = {
    id: number
    title: string
    slug: string
    createdAt: string
    createdAtRaw: string
    destinations?: Destination[]
    tags?: Tag[]
}

export type FlightOfferCardType = {
    id: number
    title: string
    slug: string
    imageUrl: string
    destination: Destination
    color?: 'purple' | 'yellow' | 'red'
}

export type TravelmateRowType = {
    id: number
    title: string
    slug: string
    createdAt: string
    user: UserProfile
    destinations?: Destination[]
    topics?: Topic[]
}
