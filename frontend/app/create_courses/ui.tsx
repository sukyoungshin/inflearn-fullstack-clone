'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import * as api from '@/lib/api';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {ExternalToast, toast} from 'sonner';

export default function UI() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const {mutate: createCourseMutation} = useMutation({
    mutationFn: () => api.createCourse(title),
    onSuccess: res => {
      if (res.data) {
        toast.success('코스가 생성되었습니다.', {
          action: {
            label: '이동하기',
            onClick: () => router.push(`/course/${res.data?.id}/edit/course_info`),
          },
          duration: 5000,
        });
      }
      if (res.error) {
        toast.error('코스 생성에 실패했습니다.', res.error);
      }
    },
    onError: error => {
      toast.error('코스 생성에 실패했습니다.', error.message as ExternalToast);
    },
  });

  return (
    <div className='w-full max-w-xl mx-auto h-[90vh] flex flex-col items-center justify-center gap-4'>
      <h2 className='text-xl text-center font-boldd'>
        제목을 입력해주세요!
        <br />
        너무 고민하지마세요. 제목은 언제든 수정 가능해요 :)
      </h2>
      <Input
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='제목을 입력해주세요.'
        className='bg-[#F6F6F6] py-6 rounded-xs'
      />
      <div className='space-x-2'>
        <Button role='button' variant='outline' className='px-8 py-6 text-md font-bold'>
          이전
        </Button>
        <Button
          role='button'
          onClick={() => createCourseMutation()}
          variant={'default'}
          className='px-8 py-6 text-md font-bold'
        >
          만들기
        </Button>
      </div>
    </div>
  );
}
