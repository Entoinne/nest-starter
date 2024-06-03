import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

Injectable();
export class PasswordService implements PasswordHasherServiceInterface {
    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(providedPassword: string, storedPassword: string) {
        return await bcrypt.compare(providedPassword, storedPassword);
    }
}