import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AccessTokenGuard } from './auth/guards/access-token.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user-test')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  getUserTest(@Req() req: Request & { user: JwtPayload }): string {
    console.log('/test req?.user', req.user.email);
    return 'test completed';
  }
}
