import { ConflictException, Injectable, Logger } from '@nestjs/common';

import * as argon2 from 'argon2'

import { User } from '@user/user.entity';
import { UserService } from '@user/user.service';
import { RegisterDTO } from '@auth/register.dto';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name)

    constructor(
        private readonly userService: UserService,
    ) {}

    async register(registerDTO: RegisterDTO): Promise<User> {

        this.logger.debug(`[REGISTER] Attempting registration for email: ${registerDTO.email}, username: ${registerDTO.username}.`)

        const existingUser = await this.userService.findByIdentifier(registerDTO.email, registerDTO.username)
        if (existingUser) {
            this.logger.warn(`[REGISTER] Registration failed: User already exists with email: ${registerDTO.email} or username: ${registerDTO.username}`)
            throw new ConflictException('User or email already exists.')
        }

        this.logger.verbose('[REGISTER] Hashing password and generating activation code...')

        const hashedPassword = await argon2.hash(registerDTO.password)
        const activationCode = Math.floor(100000 + Math.random() * 900000)

        this.logger.verbose('[REGISTER] Saving new inactive user profile to database...')

        const newUser = this.userService.create({ ...registerDTO, hashedPassword, activationCode, isActive: false })
        const savedUser = await this.userService.save(newUser)

        this.logger.verbose(`[REGISTER] User successfully registered: ${savedUser.id}.`)

        return savedUser
        
    }
}
