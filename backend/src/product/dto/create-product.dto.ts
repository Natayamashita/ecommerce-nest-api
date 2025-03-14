import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber,IsString } from 'class-validator';

export class CreateProductDto {
    @Expose()
    @ApiProperty()
    @IsString()
    name: string;

    @Expose()
    @ApiProperty()
    @IsString()
    description: string;

    @Expose()
    @ApiProperty()
    @IsString()
    category: string;

    @Expose()
    @ApiProperty()
    @IsNumber()
    stock: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    price: number;

    @Expose()
    @ApiProperty()
    @IsString()
    unity_measure: string;

    @Expose()
    @ApiProperty()
    @IsBoolean()
    status: boolean
}
