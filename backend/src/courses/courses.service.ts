import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import slugify from 'lib/slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/upate-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    console.log('create course.service >> ', createCourseDto);

    return this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        slug: slugify(createCourseDto.title),
        instructorId: userId,
        status: 'DRAFT',
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CourseWhereUniqueInput;
    where?: Prisma.CourseWhereInput;
    orderBy?: Prisma.CourseOrderByWithRelationInput;
  }): Promise<Course[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.course.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: string, include?: string[]): Promise<Course | null> {
    const includeObject: Prisma.CourseInclude = {};
    if (include) {
      include.forEach((item) => {
        includeObject[item] = true;
      });
    }

    return this.prisma.course.findUnique({
      where: { id },
      include: include && include.length > 0 ? includeObject : undefined,
    });
  }

  async update(
    id: string,
    userId: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    const { categoryIds, ...otherData } = updateCourseDto;
    const data: Prisma.CourseUpdateInput = {
      ...otherData,
    };

    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`${id} 코스가 존재하지 않습니다.`);
    }

    if (course.instructorId !== userId) {
      throw new UnauthorizedException('강의 소유자만 수정할 수 있습니다.');
    }

    if (categoryIds && categoryIds.length > 0) {
      data.categories = {
        connect: categoryIds.map((id) => ({ id })),
      };
    }

    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`${id} 코스가 존재하지 않습니다.`);
    }

    if (course.instructorId !== userId) {
      throw new UnauthorizedException('강의 소유자만 삭제할 수 있습니다.');
    }

    await this.prisma.course.delete({
      where: { id },
    });

    return course;
  }
}
