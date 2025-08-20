import { UserEntity } from "./user.entity";

export class ProfileEntity {
    id: string; 
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    dateOfBirth: string;
    createdAt: Date;
    updatedAt: Date;
    userId?: string;
    adminId?: string;
    superAdminId?: string;
    artistId?: string;
    user?: UserEntity;

    constructor(data: Partial<ProfileEntity>) {
        Object.assign(this, data);
    }

}