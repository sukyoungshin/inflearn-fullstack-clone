import {Metadata} from 'next';
import InstructorUI from './ui';

export const metadata: Metadata = {
  title: '대시보드 - 인프런 | 지식공유자',
  description: '인프런 지식공유자 페이지입니다.',
};

export default function InstructorPage() {
  return <InstructorUI />;
}
