import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

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
    @ApiProperty({ type: Date, required: false })
    @IsDate()
    dateOfBirth?: Date;

    constructor(data: Partial<UpdateProfileDto>) {
        Object.assign(this, data);
    }
}