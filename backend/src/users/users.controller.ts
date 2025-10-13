import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/_gen/prisma-class/user';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users (사용자)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '프로필 조회' })
  @ApiOkResponse({ description: '프로필 조회 성공', type: User })
  getProfile(@Req() req: Request & { user: { sub: string } }) {
    return this.usersService.getProfile(req.user.sub);
  }

  @Patch('profile')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '프로필 업데이트' })
  @ApiOkResponse({ description: '프로필 업데이트 성공', type: User })
  updateProfile(
    @Req() req: Request & { user: { sub: string } },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(req.user.sub, updateUserDto);
  }
}
