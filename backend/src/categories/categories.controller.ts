import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseCategory } from 'src/_gen/prisma-class/course_category';
import { CategoriesService } from './categories.service';

@ApiTags('Categories (카테고리)')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('')
  @ApiOperation({ summary: '카테고리 목록 조회' })
  @ApiOkResponse({
    description: '카테고리 목록를 성공적으로 조회',
    type: CourseCategory,
    isArray: true,
  })
  findAll() {
    return this.categoriesService.findAll();
  }
}
