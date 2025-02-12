
import { UserService } from '@/modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginInput } from './dto/login.input';
import { SignUpInput } from './dto/signup.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    console.log(await bcrypt.compare(password, user.password));

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginInput: LoginInput) {
    const user = await this.validateUser(loginInput.email, loginInput.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }

  async signUp(signUpInput: SignUpInput) {
    const existingUser = await this.userService.findByEmail(signUpInput.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    console.log(signUpInput.password);

    const hashedPassword = await bcrypt.hash(signUpInput.password, 10);
    const user = await this.userService.create({
      ...signUpInput,
      password: hashedPassword,
    });

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}