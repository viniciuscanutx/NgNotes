export interface User {
    id: number;
    name: string;
    username: string;
    avatarUrl: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile {
    id: number;
    name: string;
    username: string;
    avatarUrl: string;
    email: string;
}