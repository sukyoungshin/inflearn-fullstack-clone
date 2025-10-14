import {Metadata} from 'next';
import MentoringUI from './ui';

export const metadata: Metadata = {
  title: '멘토링 - 인프런 | 멘토링',
  description: '인프런 멘토링 페이지입니다.',
};

function MentoringPage() {
  return <MentoringUI />;
}

export default MentoringPage;
