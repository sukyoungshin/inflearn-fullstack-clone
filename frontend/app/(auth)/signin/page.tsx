'use client';

import {signIn} from 'next-auth/react';
import Link from 'next/link';
import {useState} from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-2xl font-bold'>로그인 페이지</h1>
      <p>인프런 계정으로 로그인 해주세요.</p>

      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full max-w-md'>
        <label htmlFor='email'>이메일</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='email@email.com'
          className='w-full p-2 border border-gray-300 rounded-md'
        />
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='password@password.com'
          className='w-full p-2 border border-gray-300 rounded-md'
        />
        <button
          type='submit'
          className='w-full p-2 bg-green-500 text-white font-bold rounded-md cursor-pointer hover:bg-green-600'
        >
          로그인
        </button>
        <Link href='/signup' className='text-center'>
          회원가입
        </Link>
      </form>
    </div>
  );
}
