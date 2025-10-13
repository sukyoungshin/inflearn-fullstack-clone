'use client';
import {CATEGORY_ICONS} from '@/app/constants/category-icons';
import {signOut} from '@/auth';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {CourseCategory, User} from '@/generated/openapi-client';
import {Popover, PopoverContent, PopoverTrigger} from '@radix-ui/react-popover';
import {Search} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';

export default function SiteHeader({categories, profile}: {categories: CourseCategory[]; profile?: User | null}) {
  const pathName = usePathname();
  const isSiteHeaderNeeded = !pathName.includes('/course/');
  const isCategoryNeeded = pathName.includes('/courses') || pathName === '/';

  if (!isSiteHeaderNeeded) return null;

  return (
    <header className='site-header w-full border-b bg-white'>
      {/* 상단 헤더 */}
      <div className='header-top flex items-center justify-between px-8 py-3 gap-4'>
        {/* 로고 */}
        <div className='logo min-w-[120px]'>
          <Link href='/'>
            <Image
              src='/images/inflearn_public_logo.png'
              className='w-28 h-auto'
              width={120}
              height={32}
              alt='inflearn'
            />
          </Link>
        </div>
        {/* 네비게이션 */}
        <nav className='main-nav flex gap-6 text-base font-bold text-gray-700'>
          <Link href='#' className='hover:text-[#1dc078] transition-colors'>
            강의
          </Link>
          <Link href='#' className='hover:text-[#1dc078] transition-colors'>
            로드맵
          </Link>
          <Link href='#' className='hover:text-[#1dc078] transition-colors'>
            멘토링
          </Link>
          <Link href='#' className='hover:text-[#1dc078] transition-colors'>
            커뮤니티
          </Link>
        </nav>
        {/* 검색창 + 아이콘 */}
        <div className='flex-1 flex justify-center'>
          <div className='relative flex w-full max-w-xl items-center'>
            <Input
              type='text'
              placeholder='나의 진짜 성장을 도와줄 실무 강의를 찾아보세요'
              className='w-full bg-gray-50 border-gray-200 focus-visible:ring-[#1dc078] pr-10'
            />
            <button
              type='button'
              className='absolute right-2 p-1 text-gray-400 hover:text-[#1dc078] transition-colors'
              tabIndex={-1}
            >
              <Search size={20} />
            </button>
          </div>
        </div>
        {/* 지식공유자 버튼 */}
        <Link href='/instructor'>
          <Button
            role='button'
            variant='outline'
            className='font-semibold border-gray-200 hover:border-[#1dc078] hover:text-[#1dc078]'
          >
            지식공유자
          </Button>
        </Link>

        {/* 프로필 + Popover or 로그인 버튼 */}
        {true ? (
          <Popover>
            <PopoverTrigger asChild>
              <div className='ml-2 cursor-pointer'>
                <Avatar>
                  <AvatarImage
                    src={profile?.image || ''}
                    alt='avatar'
                    className='w-full h-full object-cover rounded-full'
                  />
                  <AvatarFallback>{profile?.name?.charAt(0) || 'ㅇ'}</AvatarFallback>
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-56 p-0 bg-white border border-gray-200 rounded-md'>
              <div className='px-4 py-3 border-b border-gray-100'>
                <div className='font-semibold text-gray-800'>{profile?.name || profile?.email || '내 계정'}</div>
                {profile?.email && <div className='text-xs text-gray-500 mt-1'>{profile.email}</div>}
              </div>
              <button
                type='button'
                role='button'
                className='w-full text-left px-4 py-3 hover:bg-gray-100 focus:outline-none'
                onClick={() => (window.location.href = '/my/settings/account')}
              >
                <div className='font-semibold text-gray-800'>프로필 수정</div>
              </button>
              <button
                type='button'
                role='button'
                className='w-full text-left px-4 py-3 hover:bg-gray-100 focus:outline-none border-t border-gray-100'
                onClick={() => signOut()}
              >
                <div className='font-semibold text-gray-800'>로그아웃</div>
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <Link href='/signin'>
            <Button
              role='button'
              type='button'
              variant='outline'
              className='font-semibold border-gray-200 hover:border-[#1dc078] hover:text-[#1dc078] ml-2'
            >
              로그인
            </Button>
          </Link>
        )}
      </div>

      {/* 하단 카테고리 */}
      <div className='header-bottom bg-white px-8'>
        {isCategoryNeeded && (
          <nav className='category-nav flex gap-6 py-4 overflow-x-auto scrollbar-none'>
            {categories.map(category => (
              <Link key={category.id} href={`/courses/${category.slug}`}>
                <div className='category-item flex flex-col items-center min-w-[72px] text-gray-700 hover:text-[#1dc078] cursor-pointer transition-colors'>
                  {/* <Layers size={28} className="mb-1" /> */}
                  {React.createElement(CATEGORY_ICONS[category.slug] || CATEGORY_ICONS['default'], {
                    size: 28,
                    className: 'mb-1',
                  })}
                  <span className='text-xs font-medium whitespace-nowrap'>{category.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
