import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class signInDto {
    @ApiProperty()
    @Expose()
    email: string
    
    @Expose()
    @ApiProperty()
    password: string
}
