import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({email});
  }

  async createUser(user: CreateUserDto) {
    const newUser = new User();
    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.password = await this.getPasswordHash(user.password);
    // TODO VALIDATE USER DATA - https://github.com/typestack/class-validator
    return this.usersRepository.save(newUser);
  }

  async removeUser(id: number) {
    const entity = await this.findOne(id);

    if (!entity) {
      throw new Error('Not found entity');
    }

    return this.usersRepository.remove(entity);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async getPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

}
