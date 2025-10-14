import {Metadata} from 'next';
import RoadmapUI from './ui';

export const metadata: Metadata = {
  title: '로드맵 - 인프런 | 로드맵',
  description: '인프런 로드맵 페이지입니다.',
};

function RoadmapPage() {
  return <RoadmapUI />;
}

export default RoadmapPage;
