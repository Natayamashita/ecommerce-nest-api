import { Controller, Post, Body, HttpCode, Request, HttpStatus, Param, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signInDto.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard) // Aqui definimos qual rota guardar
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
