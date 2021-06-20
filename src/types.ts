export type User = {
    id: number;
    name: string;
    email: string;
    contact_facebook: string | null;
    contact_twitter: string | null;
    contact_instagram: string | null;
    contact_homepage: string | null;
    profile_color: string;
    real_name: string;
    real_name_show: boolean;
    gender: number | null;
    birthyear: number | null;
    description: string | null;
    notify_message: boolean;
    notify_follow: boolean;
    role: string;
    rank: number;
    verified: boolean;
    registration_token: string | null;
    remember_token: string | null;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    active_at: string /* Date */ | null;
    company: boolean;
    contents?: Content[] | null;
    comments?: Comment[] | null;
    images?: Image[] | null;
};

export type Destination = {
    id: number;
    name: string;
    slug: string,
    description: string;
    parentDestination: Destination | null;
};

export type Comment = {
    id: number;
    user_id: number;
    content_id: number;
    body: string | null;
    status: boolean;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    content?: Content | null;
    user?: User | null;
};

export type Content = {
    id: number;
    user_id: number;
    title: string | null;
    body: string | null;
    type: string;
    url: string | null;
    status: boolean;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    start_at: string /* Date */ | null;
    end_at: string /* Date */ | null;
    duration: string | null;
    price: number | null;
    slug: string;
    user?: User | null;
    comments?: Comment[] | null;
    images?: Image[] | null;
    destinations?: Destination[] | null
};

export type Image = {
    id: number;
    filename: string;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    content?: Content[] | null;
    user?: User[] | null;
};