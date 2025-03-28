import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';//aqui importamos o Jwt para gerar os tokens

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SUPERSECRET ?? `shh`,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
