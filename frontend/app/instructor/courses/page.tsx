import * as api from '@/lib/api';
import {Metadata} from 'next';
import UI from './ui';

export const metadata: Metadata = {
  title: '강좌 관리 - 인프런',
  description: '인프런 강좌 관리 페이지입니다.',
};

export default async function InstructorCoursesPage() {
  const {data: courses} = await api.getAllInstructorCourses();

  return <UI courses={courses ?? []} />;
}
