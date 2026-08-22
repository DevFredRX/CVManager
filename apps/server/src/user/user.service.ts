import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@user/user.entity';

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name)

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async findByIdentifier(email: string, username: string): Promise<User | null> {
        this.logger.debug(`[USER] Checking existence for email: ${email} or username: ${username}`)
        return this.userRepository.findOne({ where: [{ email }, { username }] })
    }

    create(userData: Partial<User>): User {
        return this.userRepository.create(userData)
    }

    async save(user: User): Promise<User> {
        this.logger.debug(`[USER] Saving user record (ID: ${user.id ?? 'new'})`)
        return this.userRepository.save(user)
    }

}
