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


  if (courseCategories.courseCategoryCoursesIsLoading) {

    return <MainLayout background="bg-[#1AA662]" backPath="/courses" title={courseCategories.courseCategoryData.length ? courseCategories.courseCategoryData[0].name : ""}>
      <div className="flex flex-col p-5 h-screen">
        <div className="grid grid-cols-1 space-y-5 ">
          <div className="bg-white rounded-2xl flex items-center px-3 py-4 drop-shadow-sm">
            <div className="h-20 w-20 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="flex flex-col space-y-2 ml-3">
              <div className="bg-gray-200 h-4 w-48 rounded-md animate-pulse"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-4 w-24 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl flex items-center px-3 py-4 drop-shadow-sm">
            <div className="h-20 w-20 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="flex flex-col space-y-2 ml-3">
              <div className="bg-gray-200 h-4 w-48 rounded-md animate-pulse"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-4 w-24 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl flex items-center px-3 py-4 drop-shadow-sm">
            <div className="h-20 w-20 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="flex flex-col space-y-2 ml-3">
              <div className="bg-gray-200 h-4 w-48 rounded-md animate-pulse"></div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-4 w-24 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>


  }

  return <MainLayout background='bg-[#1AA662]' backPath={`/courses`} title={courseCategories.courseCategoryData.length ? courseCategories.courseCategoryData[0].name : ""}>

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
