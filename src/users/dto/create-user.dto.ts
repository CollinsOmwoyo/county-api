import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { userRole } from "../enums/user-role.enum";
export class CreateUserDto {
@IsNotEmpty()
@MinLength(3)
name: string;

    @IsNotEmpty()
@MinLength(3)
username: string;

@IsNotEmpty()
@IsEmail()
email: string;

@IsNotEmpty()
@MinLength(6)
password: string;

@IsEnum(userRole)
role: userRole;
}