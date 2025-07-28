import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ActiveUser } from '../decorators/active-user.decorator';
import { ActiveUserInterface } from '../interfaces/active-user';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(200)
  @Post('sign-in')
  async signIn(@Body() data: SignInDto) {
    const token = await this.authenticationService.signIn(
      data.email,
      data.password,
    );

    return {
      access_token: token.accessToken,
    };
  }

  @HttpCode(201)
  @Post('sign-up')
  async signUp(@Body() data: SignUpDto) {
    const token = await this.authenticationService.signUp(data);

    return {
      access_token: token.accessToken,
    };
  }

  @Auth(AuthType.Bearer)
  @HttpCode(200)
  @Post('refresh-token')
  async refreshToken(@ActiveUser() user: ActiveUserInterface) {
    const token = await this.authenticationService.refreshToken(
      user.sub.toString(),
    );

    return {
      access_token: token.accessToken,
    };
  }
}
