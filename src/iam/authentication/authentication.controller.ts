import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  signIn(@Body() data: SignInDto) {
    return this.authenticationService.signIn(data.email, data.password);
  }

  @Post('sign-up')
  signUp(@Body() data: SignUpDto) {
    return this.authenticationService.signUp(data);
  }
}
