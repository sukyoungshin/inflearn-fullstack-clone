import * as api from '@/lib/api';
import {Metadata} from 'next';
import {redirect} from 'next/navigation';
import UI from './ui';

export const metadata: Metadata = {
  title: '계정 설정 - 인프런',
  description: '인프런 계정 설정 페이지입니다.',
};

export default async function AccountSettingsPage() {
  const profile = await api.getProfile();
  if (!profile.data || profile.error) {
    redirect('/signin');
  }

  return <UI profile={profile.data} />;
}
