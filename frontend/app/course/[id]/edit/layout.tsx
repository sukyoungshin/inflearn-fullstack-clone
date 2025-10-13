import * as api from '@/lib/api';
import {notFound} from 'next/navigation';
import EditCourseHeader from './_components/edit-course-header';
import EditCourseSidebar from './_components/edit-course-sidebar';

const EditCourseLayout = async ({children, params}: {children: React.ReactNode; params: Promise<{id: string}>}) => {
  const {id} = await params;
  const {data: course, error} = await api.getCourseById(id);

  if (error || !course) {
    notFound();
  }

  return (
    <div className='w-full h-full bg-[#F1F3F5]'>
      <EditCourseHeader course={course} />
      <div className='p-12 flex gap-12 min-h-screen max-w-5xl'>
        <EditCourseSidebar />
        {children}
      </div>
    </div>
  );
};

export default EditCourseLayout;
