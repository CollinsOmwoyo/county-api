import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { UserRole } from "../user-role.enum.ts";
export class CreateUserDto {
@IsNotEmpty()
@MinLength(3)
username: string;

@IsNotEmpty()
@IsEmail()
email: string;

@IsNotEmpty()
@MinLength(6)
password: string;

@IsEnum(UserRole)
  role: UserRole;
}