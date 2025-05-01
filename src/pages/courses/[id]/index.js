import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useParams } from 'next/navigation';
import { fetchCourseByCategories, fetchCourseCategory } from '@/pages/api';
import Link from 'next/link';

export default function Home() {

  const dispatch = useDispatch()
  const courseCategories = useSelector((state) => state.courseCategories);
  const params = useParams()

  useEffect(() => {
    if (params) {
      dispatch(fetchCourseCategory(params))
      dispatch(fetchCourseByCategories(params))
    }
  }, [params])


  return <MainLayout background='bg-[#1AA662]'  backPath={`/courses`} title={courseCategories.courseCategoryData.length ? courseCategories.courseCategoryData[0].name : ""}>

  <div className='flex flex-col space-y-5  p-5'>

      {courseCategories.courseCategoryCoursesData.map((course, cr) => {
        return <Link href={`/courses/${course.id}/lessons`} key={cr} className='bg-white rounded-xl drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)] py-5 px-5 flex items-center gap-5'>
          <img className=' w-16' src={course.image_link} />
          <div className='flex flex-col space-y-2'>
            <span className='font-bold'>{course.name}</span>
            <p className=' text-xs  text-neutral-500 line-clamp-2'>{course.content}</p>
          </div>
        </Link>
      })}

    </div>

  </MainLayout>
}
