import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

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
}
