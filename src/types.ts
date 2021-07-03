export type User = {
    id: number;
    name: string;
    rank: number;
    email?: string;
    contact_facebook?: string | null;
    contact_twitter?: string | null;
    contact_instagram?: string | null;
    contact_homepage?: string | null;
    profile_color?: string;
    real_name?: string;
    real_name_show?: boolean;
    gender?: number | null;
    birthyear?: number | null;
    description?: string | null;
    notify_message?: boolean;
    notify_follow?: boolean;
    role?: string;
    verified?: boolean;
    active_at?: string | null;
    company?: boolean;
    contents?: Content[] | null;
    comments?: Comment[] | null;
    images?: Image[] | null;
    profile_image?: Image | null;
};

export type Destination = {
    id: number;
    name: string;
    slug: string,
    parentDestination: Destination | null;
};

export type Topic = {
    id: number;
    name: string;
};

export type Comment = {
    id: number;
    user_id: number;
    content_id: number;
    body: string | null;
    status: boolean;
    created_at: string;
    updated_at: string | null;
    content?: Content | null;
    user?: User | null;
};

export type Content = {
    id: number;
    title: string;
    body: string;
    type: string;
    slug: string;
    url?: string | null;
    status?: boolean;
    created_at: string | null;
    updated_at: string | null;
    start_at: string | null;
    end_at: string | null;
    duration: string | null;
    price: number | null;
    user?: User | null;
    comments?: Comment[] | null;
    images?: Image[] | null;
    destinations?: Destination[] | null
};

export type Image = {
    id: number;
    filename: string;
    created_at: string | null;
    updated_at: string | null;
    content?: Content[] | null;
    user?: User | null;
};


export type ForumRowType = {
    id: number;
    title: string;
    updatedAt: string;
    isUnread: boolean;
    viewsCount: number;
    commentsCount: number;
    user: User;
    destinations?: Destination[] | null;
    topics?: Topic[] | null;
}

export type NewsCardType = {
    id: number;
    title: string;
    slug: string;
    createdAt: string;
    commentsCount: number;
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