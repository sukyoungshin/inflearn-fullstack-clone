'use client';

import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function InstructorPageName() {
  const pathname = usePathname();
  const [title, setTitle] = useState('대시보드');

  useEffect(() => {
    setTitle(pathname === '/instructor/courses' ? '강의 관리' : '대시보드');
  }, [pathname]);

  return (
    <div className='w-full bg-gray-700'>
      <div className='w-6xl mx-auto text-white text-2xl font-bold py-4 px-8'>{title}</div>
    </div>
  );
}
