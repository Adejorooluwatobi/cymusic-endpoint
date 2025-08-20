export type CreateUserParams = {
    email: string;
    password: string;
    displayName: string;
    role?: 'user'
    isVerified?: boolean;
    isActive?: boolean;
    googleId?: string;
    appleId?: string;
}

export type UpdateUserParams = {
    email?: string;
    password?: string;
    displayName?: string;
    role?: 'user';
    isVerified?: boolean;
    isActive?: boolean;
    googleId?: string;
    appleId?: string;
}

export type CreateSuperAdminParams = {
    email: string;
    password: string;
    role: 'super-admin';
    isActive?: boolean;
    displayName: string;
}

export type UpdateSuperAdminParams = {
    email?: string;
    password?: string;
    displayName?: string;
    role?: 'super-admin';
    isActive?: boolean;
}

export type CreateArtistParams = {
    email: string;
    password: string;
    displayName: string;
    role: 'artist';
    googleId?: string;
    isActive?: boolean;
    appleId?: string;
}

export type UpdateArtistParams = {
    email?: string;
    password?: string;
    displayName?: string;
    role?: 'artist';
    googleId?: string;
    appleId?: string;
    isActive?: boolean;
}

export type CreateAdminParams = {
    email: string;
    password: string;
    role: 'admin';
    isActive?: boolean;
    displayName: string;
}

export type UpdateAdminParams = {
    email?: string;
    password?: string;
    displayName?: string;
    role?: 'admin';
    isActive?: boolean;
}