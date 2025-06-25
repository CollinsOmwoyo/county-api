import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { User } from '@users/entities/user.entity';
import { UsersService } from '@users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
constructor(
private readonly userService: UsersService,
  private readonly jwtService: JwtService, // ✅ Corrected injection
) {}

async register(createUserDto: CreateUserDto): Promise<User> {
return this.userService.create(createUserDto);
}

async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
    return user;
    }
    return null;
}

async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
    access_token: this.jwtService.sign(payload),
    };
}
}
