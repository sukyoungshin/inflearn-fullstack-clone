import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Course } from 'src/_gen/prisma-class/course';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/upate-course.dto';

@ApiTags('Courses (코스)')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '코스 생성' })
  @ApiOkResponse({
    description: '코스 생성',
    type: Course,
  })
  create(
    @Req() req: Request & { user: { sub: string } },
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return this.coursesService.create(req.user.sub, createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: '코스 목록 조회' })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'level', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @ApiOkResponse({
    description: '코스 목록 조회 성공',
    type: Course,
    isArray: true,
  })
  findAll(
    @Query('title') title?: string,
    @Query('level') level?: string,
    @Query('categoryId') categoryId?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const where: Prisma.CourseWhereInput = {};
    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (level) {
      where.level = level;
    }

    if (categoryId) {
      where.categories = {
        some: {
          id: categoryId,
        },
      };
    }

    return this.coursesService.findAll({
      where,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get(':id')
  @ApiQuery({
    name: 'include',
    required: false,
    description: 'sections, lectures, courseReviews 등 포함할 관계를 지정',
  })
  @ApiOperation({ summary: '코스 상세 정보' })
  @ApiOkResponse({
    description: '코스 상세 정보',
    type: Course,
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('include') include?: string,
  ) {
    let includeObject: Prisma.CourseInclude;
    const includeArray = include ? include.split(',') : undefined;

    if (
      includeArray?.includes('sections') &&
      includeArray?.includes('lectures')
    ) {
      const otherInclude = includeArray.filter(
        (item) => item !== 'sections' && item !== 'lectures',
      );

      includeObject = {
        sections: {
          include: {
            lectures: true,
          },
          ...otherInclude.map((item) => ({
            [item]: true,
          })),
        },
      };
    } else {
      includeObject = {
        ...includeArray?.map((item) => ({
          [item]: true,
        })),
      } as Prisma.CourseInclude;
    }

    return this.coursesService.findOne(id, includeObject);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '코스 수정' })
  @ApiOkResponse({
    description: '코스 수정',
    type: Course,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request & { user: { sub: string } },
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, req.user.sub, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '코스 삭제' })
  @ApiOkResponse({
    description: '코스 삭제',
    type: Course,
  })
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: Request & { user: { sub: string } },
  ) {
    return this.coursesService.delete(id, req.user.sub);
  }
}
