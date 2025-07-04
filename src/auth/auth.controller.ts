import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
constructor(private authService: AuthService) {}

@Post('register')
@ApiOperation({ summary: 'Register a new user' })
async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
}

@UseGuards(LocalAuthGuard)
@Post('login')
@ApiOperation({ summary: 'Login a user' })
async login(@Request() req) {
    return this.authService.login(req.user);
}
}
