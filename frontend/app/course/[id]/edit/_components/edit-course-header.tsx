'use client';

import {Button} from '@/components/ui/button';
import {X} from 'lucide-react';

const EditCourseHeader = ({title}: {title: string}) => {
  return (
    <header className='flex justify-between items-center px-6 py-4 bg-white'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <div className='flex items-center gap-2'>
        <Button
          role='button'
          size='lg'
          // disabled={
          //   publishCourseMutation.isPending || course.status === "PUBLISHED"
          // }
          // onClick={() => publishCourseMutation.mutate()}
        >
          {/* {publishCourseMutation.isPending ? (
        <Loader2 size={20} className="animate-spin" />
      ) : course.status === "PUBLISHED" ? ( */}
          <span>제출</span>
          {/* ) : (
        <span>제출하기</span>
      )} */}
        </Button>
        <Button
          role='button'
          variant='outline'
          size='lg'
          // onClick={() => router.push("/instructor/courses")}
        >
          <X size={20} />
        </Button>
      </div>
    </header>
  );
};

export default EditCourseHeader;
