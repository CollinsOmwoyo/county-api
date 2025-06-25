import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { User } from '@users/entities/user.entity';
import { UsersService } from '@users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async register(createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
//change promise
    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
}
