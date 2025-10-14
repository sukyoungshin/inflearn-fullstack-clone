import {Metadata} from 'next';
import CourseUI from './ui';

export const metadata: Metadata = {
  title: '강의 - 인프런 | 강의',
  description: '인프런 강의 페이지입니다.',
};

function CoursePage() {
  return <CourseUI />;
}

export default CoursePage;
