import InstructorPageName from './__components/instructor-page-name';
import InstructorSidebar from './__components/instructor-sidebar';

export default function InstructorLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex flex-col'>
      {/* 제목 */}
      <InstructorPageName />
      <div className='flex'>
        <InstructorSidebar />
        {children}
      </div>
    </div>
  );
}
