export type CreateUserParams = {
    email: string;
    password: string;
    displayName: string;
    isVerified?: boolean;
    isActive?: boolean;
    googleId?: string;
    appleId?: string;
}

export type UpdateUserParams = {
    email?: string;
    password?: string;
    displayName?: string;
    isVerified?: boolean;
    isActive?: boolean;
    googleId?: string;
    appleId?: string;
}

export type CreateSuperAdminParams = {
    email: string;
    password: string;
    isActive?: boolean;
    displayName: string;
}

export type UpdateSuperAdminParams = {
    email?: string;
    password?: string;
    displayName?: string;
    isActive?: boolean;
}

export type CreateArtistParams = {
    email: string;
    password: string;
    displayName: string;
    googleId?: string;
    isActive?: boolean;
    appleId?: string;
}

export type UpdateArtistParams = {
    email?: string;
    password?: string;
    displayName?: string;
    googleId?: string;
    appleId?: string;
    isActive?: boolean;
}

export type CreateAdminParams = {
    email: string;
    password: string;
    isActive?: boolean;
    displayName: string;
}

export type UpdateAdminParams = {
    email?: string;
    password?: string;
    displayName?: string;
    isActive?: boolean;
}

export type CreateProfileParams = {
    phoneNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    dateOfBirth: Date;
    userId?: string;
}

export type UpdateProfileParams = {
    phoneNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    dateOfBirth?: Date;
    userId?: string;
}