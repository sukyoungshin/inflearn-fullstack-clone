import {Metadata} from 'next';
import CommunityUI from './ui';

export const metadata: Metadata = {
  title: '커뮤니티 - 인프런 | 커뮤니티',
  description: '인프런 커뮤니티 페이지입니다.',
};

function CommunityPage() {
  return <CommunityUI />;
}

export default CommunityPage;
