import {
  BadRequestException,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { MediaService } from './media.service';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 300 * 1024 * 1024, // 300MB
      },
    }),
  )
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '미디어 업로드 요청파일',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '이미지(jpg, png) 또는 동영상(mp4 등) 파일',
        },
      },
    },
  })
  @ApiOkResponse({
    description: '미디어 업로드 결과 (videoStorageInfo)',
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request & { user: { sub: string } },
  ) {
    if (!file) {
      throw new BadRequestException('파일이 없습니다.');
    }

    return this.mediaService.uploadFile(file, req.user.sub);
  }
}
