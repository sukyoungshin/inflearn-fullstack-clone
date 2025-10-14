import {Metadata} from 'next';
import CreateCoursesUI from './ui';

export const metadata: Metadata = {
  title: '강의 생성 - 인프런 | 강의 생성',
  description: '인프런 강의 생성 페이지입니다.',
};

export default function CreateCoursesPage() {
  return <CreateCoursesUI />;
}
