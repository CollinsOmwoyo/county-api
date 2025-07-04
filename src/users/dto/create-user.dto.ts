import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { userRole } from "../enums/user-role.enum";
export class CreateUserDto {
@ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
})
@IsNotEmpty()
@MinLength(3)
name: string;

    @IsNotEmpty()
@MinLength(3)
@ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
})
username: string;

@IsNotEmpty()
@IsEmail()
@ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@gmail.com'})
email: string;


@IsNotEmpty()
@MinLength(6)
@ApiProperty({
    description: 'The password of the user',
    example: 'password123',
})
password: string;

@IsEnum(userRole)
@ApiProperty({
    description: 'The role of the user',
    enum: userRole,
    example: userRole.CITIZEN,
})
role: userRole;
}