import * as api from '@/lib/api';
import {notFound} from 'next/navigation';
import UI from './ui';

export default async function EditCourseInfoPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const {data: course, error} = await api.getCourseById(id);
  if (!course || error) {
    notFound();
  }

  return <UI course={course} />;
}
