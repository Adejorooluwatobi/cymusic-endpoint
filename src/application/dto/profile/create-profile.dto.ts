import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @ApiProperty()
    phoneNumber: string;

    @IsString()
    @ApiProperty()
    address: string;

    @IsString()
    @ApiProperty()
    city: string;

    @IsString()
    @ApiProperty()
    state: string;

    @IsString()
    @ApiProperty()
    country: string;

    @IsString()
    @ApiProperty()
    postalCode: string;

    @ApiProperty({ type: Date })
    @IsDate()
    dateOfBirth: Date;

    @IsOptional()
    @IsString()
    userId?: string;

    constructor(data: Partial<CreateProfileDto>) {
        Object.assign(this, data);
    }
}