import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { ActiveUserInterface } from '../interfaces/active-user';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user);

    return {
      accessToken,
    };
  }

  async signUp(data: SignUpDto) {
    const user = await this.usersService.create(data);

    const accessToken = await this.generateAccessToken(user);

    return {
      accessToken,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await this.hashingService.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const accessToken = await this.generateAccessToken(user);

    return {
      accessToken,
    };
  }

  async generateAccessToken(user: UserDocument): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: user._id,
        email: user.email,
        name: user.name,
        last_name: user.last_name,
      } as ActiveUserInterface,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
  }
}
