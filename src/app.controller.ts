import { Controller, Get, Post, Request, Response, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { CreateUserDto } from './users/user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/register')
  async register(@Body() body: CreateUserDto, @Response() res: any) {
      const validRegistration = await this.authService.registerUser(body);

      if (validRegistration) {
        return res.status(HttpStatus.CREATED).json({
          message: 'New user registered!'
        });
      }

      return res.status(HttpStatus.CONFLICT).json({
        message: 'That e-mail address already registered!',
      });
  }
}
