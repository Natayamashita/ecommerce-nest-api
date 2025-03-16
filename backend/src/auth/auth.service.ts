import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    console.log(password, hashedPassword);
    try {
      const checked = await compare(password, hashedPassword);
      return checked;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | undefined> {
    try {
      const user = await this.usersService.findByEmail(email);
      console.log('signnn', user);
      if (!user) {
        throw new NotFoundException();
      }
      if (await this.validatePassword(password, user.password)) {
        const payload = { pass: user.password, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
