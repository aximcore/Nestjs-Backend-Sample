import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;
    @MinLength(5)
    password: string;
    @MinLength(2)
    firstName: string;
    @MinLength(2)
    lastName: string;
}