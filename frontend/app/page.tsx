import {Metadata} from 'next';
import HomeUI from './ui';

export const metadata: Metadata = {
  title: '메인 - 인프런 | 메인',
  description: '인프런 메인 페이지입니다.',
};

export default async function Home() {
  return <HomeUI />;
}
