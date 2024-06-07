import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { use } from 'passport';

Injectable();
export class GetProfileService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }


    async getProfileByUsername(username: string): Promise<User | undefined> {
        try {
            return await this.userRepository.findOneBy({ username: username['username'] });
        } catch (error) {
            throw new Error('Error while getting profile');
        }
    }
}
