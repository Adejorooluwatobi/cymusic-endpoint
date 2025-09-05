export class ArtistProfile {
  id: string;
  artistId: string;
  royaltyRate: number;
  activeFollowers: number;
  country?: string | null;
  bio?: string | null;
  profileImageUrl?: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}