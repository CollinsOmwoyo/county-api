import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async register(createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    // To later implement login functionality
    /*
    async login(createUserDto: CreateUserDto) {
        return this.userService.findOne(createUserDto.email);
    }
    */
}
