import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        });
        return this.userRepository.save(user);
    }
    
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    
    async findOne(id: string): Promise<User> {
        
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return user;
    }
    
    async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User> {
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }
    
    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
