export type User = {
    id: number
    name: string
    rank: number
    email?: string
    contact_facebook?: string
    contact_twitter?: string
    contact_instagram?: string
    contact_homepage?: string
    profile_color?: string
    real_name?: string
    real_name_show?: boolean
    gender?: number
    birthYear?: number
    description?: string
    notify_message?: boolean
    notify_follow?: boolean
    role?: string
    active_at?: string
    //company?: boolean;
    //contents?: Content[] | null;
    //comments?: Comment[] | null;
    images?: Image[] | []
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
    status: boolean
    likes: number
    dislikes: number
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
    status?: boolean
    createdAt: string
    updatedAt: string
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

export type ForumRowType = {
    id: number
    title: string
    type: string
    url: string
    updatedAt: string
    isUnread: boolean
    viewsCount: number
    commentsCount: number
    user: User
    destinations?: Destination[] | null
    topics?: Topic[] | null
}

export type ForumFullType = {
    id: number
    title: string
    slug: string
    createdAt: string
    updatedAt: string
    user: User
    destinations?: Destination[] | null
    topics?: Topic[] | null
    comments?: Comment[]
}

export type NewsCardType = {
    id: number
    title: string
    slug: string
    imageUrl: string
    createdAt: string
    commentsCount: number
}

export type ShortNewsListItemType = {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
}

export type FlightOfferRowType = {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
    destinations?: Destination[] | null;
}

export type FlightOfferCardType = {
    id: number;
    title: string;
    slug: string;
    imageUrl: string;
    destination: Destination | null;
    color?: 'purple' | 'yellow' | 'red';
}

export type TravelmateRowType = {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
    user: User;
    destinations?: Destination[] | null;
    topics?: Topic[] | null;
}