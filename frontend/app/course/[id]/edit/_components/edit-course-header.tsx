'use client';

import {Button} from '@/components/ui/button';
import {Course} from '@/generated/openapi-client';
import * as api from '@/lib/api';
import {useMutation} from '@tanstack/react-query';
import {Loader2, X} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

const EditCourseHeader = ({course}: {course: Course}) => {
  const router = useRouter();

  const {mutate: publishCourse, isPending: isPublishing} = useMutation({
    mutationFn: () => api.updateCourse(course.id, {status: 'PUBLISHED'}),
    onSuccess: () => {
      toast.success('강의가 성공적으로 게시되었습니다');
      router.refresh();
    },
    onError: error => {
      toast.error('강의 게시에 실패했습니다.', {
        description: error.message,
      });
    },
  });

  return (
    <header className='flex justify-between items-center px-6 py-4 bg-white'>
      <h2 className='text-2xl font-bold'>{course.title}</h2>
      <div className='flex items-center gap-2'>
        <Button
          role='button'
          size='lg'
          disabled={isPublishing || course.status === 'PUBLISHED'}
          onClick={() => publishCourse()}
        >
          {isPublishing ? (
            <Loader2 size={20} className='animate-spin' />
          ) : course.status === 'PUBLISHED' ? (
            <span>제출완료</span>
          ) : (
            <span>제출하기</span>
          )}
        </Button>
        <Button role='button' variant='outline' size='lg' onClick={() => router.replace('/instructor/courses')}>
          <X size={20} />
        </Button>
      </div>
    </header>
  );
};

export default EditCourseHeader;
