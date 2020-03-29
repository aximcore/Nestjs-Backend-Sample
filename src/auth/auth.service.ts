import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: string, email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    const matchPassword = await this.usersService.comparePassword(pass, user.password);

    if (user && matchPassword) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(newUser: CreateUserDto): Promise<boolean> {
    const user = await this.usersService.findOneByEmail(newUser.email);

    if (user) {
      return false;
    } 

    const entity = this.usersService.createUser(newUser);
    return true;
  } 
}
