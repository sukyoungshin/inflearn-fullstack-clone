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

  @Get('/test')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  getTest(@Req() req: Request): string {
    // @ts-expect-error error
    console.log('/test req?.user', req?.user);
    return 'test completed';
  }
}
