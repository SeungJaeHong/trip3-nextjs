export interface User {
    id: number
    name: string
    rank: number
    avatar?: string
}

export interface UserProfile extends User {
    rankName: string
    joinedDate: string
    description?: string
    liked: number
    disliked: number
    postCount: number
    commentCount: number
    placesVisited: number
}

export type LoggedInUser = {
    id: number
    name: string
    rank: number
    isAdmin: boolean
    email?: string
    contact_facebook?: string
    contact_twitter?: string
    contact_instagram?: string
    contact_homepage?: string
    real_name?: string
    real_name_show?: boolean
    gender?: number
    birthYear?: number
    description?: string
    notify_message?: boolean
    notify_follow?: boolean
    avatar?: string
}

export type Destination = {
    id: number
    name: string
    slug: string
    parentDestination?: Destination
}

export type Topic = {
    id: number
    name: string
}

export type Comment = {
    id: number
    contentId: number
    //content: Content
    user: User
    body: string
    status: number
    likes: number
    dislikes: number
    hasTimeToEdit: boolean
    createdAt: string
    updatedAt: string
}

export type Content = {
    id: number
    title: string
    body: string
    type: string
    slug: string
    url?: string
    status: number
    createdAt: string
    updatedAt?: string
    //start_at?: string
    //end_at?: string
    //duration?: string
    likes?: number
    dislikes?: number
    price?: number
    user: User
    comments?: Comment[]
    images?: Image[]
    destinations?: Destination[]
    topics?: Topic[]
}

export type Image = {
    id: number
    filename: string
    created_at: string | null
    updated_at: string | null
    content?: Content[] | null
    user?: User | null
}

export type FlightContent = {
    id: number
    title: string
    body: string
    slug: string
    status: number
    createdAt: string
    backgroundImageUrl: string
    destinations?: Destination[]
    topics?: Topic[]
}

export type NewsContent = {
    id: number
    title: string
    body: string
    slug: string
    createdAt: string
    backgroundImageUrl: string
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
}

export type ForumRowType = {
    id: number
    title: string
    type: string
    url: string
    updatedAt: string
    isNew: boolean
    unreadCommentsCount: number
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
    id: number;
    title: string;
    slug: string;
    createdAt: string;
}

export type FlightOfferRowType = {
    id: number
    title: string
    slug: string
    createdAt: string
    destinations?: Destination[]
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
    user: User
    destinations?: Destination[]
    topics?: Topic[]
}