import {Metadata} from 'next';
import SignUpUI from './ui';

export const metadata: Metadata = {
  title: '회원가입 - 인프런 | 회원가입',
  description: '인프런 회원가입 페이지입니다.',
};

export default function SignUpPage() {
  return <SignUpUI />;
}
