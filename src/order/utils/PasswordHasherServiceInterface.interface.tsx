interface PasswordHasherServiceInterface {
    hashPassword(password: string): Promise<string>;
}