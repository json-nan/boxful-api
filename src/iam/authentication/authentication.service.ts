import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDocument } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Sign-in successful',
      user,
    };
  }

  async signUp(data: SignUpDto) {
    const user = await this.usersService.create(data);

    return {
      message: 'User created successfully',
      user,
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
}
