import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AccessTokenGuard } from './auth/guards/access-token.guard';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user-test')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '로그인 유저 이메일' })
  @ApiOkResponse({
    description: '로그인 유저 이메일',
    type: String,
  })
  testUser(@Req() req: Request & { user: { email: string } }) {
    return `로그인 유저 이메일: ${req.user?.email}`;
  }
}
