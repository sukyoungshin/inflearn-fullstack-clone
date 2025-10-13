import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '이름', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '이메일', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: '비밀번호', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ description: '프로필 이미지 URL', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ description: '자기소개', required: false })
  @IsString()
  @IsOptional()
  bio?: string;
}
