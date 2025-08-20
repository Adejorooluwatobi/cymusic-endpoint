export class UserAccessTokenDto {
    accessToken: string;
    isActive: boolean;
    displayName: string;
    role: string; // Assuming role is a string, adjust as necessary

  }
export class ArtistAccessTokenDto {
    accessToken: string;
    isActive: boolean;
    displayName: string;
    role: string; // Assuming role is a string, adjust as necessary
  }

export class AdminAccessTokenDto {
    accessToken: string;
    isActive: boolean;
    displayName: string;
    role: string; // Assuming role is a string, adjust as necessary
  }

export class SuperAdminAccessTokenDto {
    accessToken: string;
    isActive: boolean;
    displayName: string;
    role: string; // Assuming role is a string, adjust as necessary
  }