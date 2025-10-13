import {auth, signOut} from '@/auth';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();

  console.log('session >> ', session);

  return (
    <div>
      <h1>로그인 한 유저 보여주기</h1>
      <p>이메일 = {session?.user?.email}</p>
      <p>이름 = {session?.user?.name}</p>

      {session ? (
        <SignOutButton />
      ) : (
        <div className='max-w-md'>
          <Link
            href='/signin'
            className='bg-blue-400 text-white p-2 w-full text-center block rounded-md hover:bg-blue-600'
          >
            로그인
          </Link>
        </div>
      )}
    </div>
  );
}

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className='max-w-md'
    >
      <button type='submit' className='bg-red-400 text-white p-2 w-full rounded-md hover:bg-red-600'>
        로그아웃
      </button>
    </form>
  );
}
