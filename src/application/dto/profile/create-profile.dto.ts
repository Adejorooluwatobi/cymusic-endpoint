import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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

    @ApiProperty({ type: String, format: 'date' })
    @IsString()
    dateOfBirth: string;

    @IsOptional()
    @IsString()
    userId?: string;

    constructor(data: Partial<CreateProfileDto>) {
        Object.assign(this, data);
    }
}