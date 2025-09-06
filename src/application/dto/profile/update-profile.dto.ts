import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    address?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    city?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    state?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    country?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    postalCode?: string;

    @IsOptional()
    @ApiProperty({ type: String, format: 'date', required: false })
    @IsString()
    dateOfBirth?: string;

    constructor(data: Partial<UpdateProfileDto>) {
        Object.assign(this, data);
    }
}