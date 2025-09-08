

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
    dateOfBirth: string;
    userId?: string;
}

export type UpdateProfileParams = {
    phoneNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    dateOfBirth?: string;
    userId?: string;
}

export type CreateAlbumParams = {
    title: string;
    music?: string[]; // Array of music IDs
    description?: string;
}

export type UpdateAlbumParams = {
    title?: string;
    music?: string[]; // Array of music IDs
    description?: string;
}

export type CreatePlaylistParams = {
    userId: string;
    name: string;
    description?: string;
    music?: string[]; // Array of music IDs
}

export type UpdatePlaylistParams = {
    userId?: string;
    name?: string;
    description?: string;
    music?: string[]; // Array of music IDs
}

export type CreateMusicParams = {
    title: string;
    artistId: string;
    audioFileUrl?: string;
    coverImageUrl?: string;
    uploadDate: Date;
    genreId?: string;
    duration?: number;
    quality?: 'low' | 'medium' | 'high' | 'lossless';
    fileSize?: number;
    isExplicit?: boolean;
    isPremium?: boolean;
    playCount?: number;
    likeCount?: number;
    shareCount?: number;
}

export type UpdateMusicParams = {
    title?: string;
    audioFileUrl?: string;
    coverImageUrl?: string;
    genreId?: string;
    duration?: number;
    quality?: 'low' | 'medium' | 'high' | 'lossless';
    fileSize?: number;
    isExplicit?: boolean;
    isPremium?: boolean;
}

export type CreateArtistProfileParams = {
    artistId?: string;
    royaltyRate?: number;
    activeFollowers: number;
    country?: string | null;
    bio?: string | null;
    profileImageUrl?: string | null;
    isVerified?: boolean;
}

export type UpdateArtistProfileParams = {
    artistId?: string;
    royaltyRate?: number;
    activeFollowers?: number;
    country?: string | null;
    bio?: string | null;
    profileImageUrl?: string | null;
    isVerified?: boolean;
}

export type CreateGenreParams = {
    name: string;
    description?: string;
}

export type updateGenreParams = {
    name?: string;
    description?: string;
}