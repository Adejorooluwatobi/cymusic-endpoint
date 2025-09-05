export class Album {
  id: string;
  title: string;
  artistId: string;
  coverImageUrl?: string;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  albumMusic?: { musicId: string; music: any }[];
}