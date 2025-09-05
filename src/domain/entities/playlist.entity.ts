export class PlaylistEntity {
  id: string;
  userId?: string;
  adminId?: string;
  superAdminId?: string;
  artistId?: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  playlistMusic?: { musicId: string; music: Record<string, unknown> }[];
}