import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useParams } from 'next/navigation';
import { fetchCourse, fetchCourses, fetchLessons } from '@/pages/api';
import Link from 'next/link';


export default function Home() {

  const dispatch = useDispatch()
  const lessons = useSelector((state) => state.lessons);
  const courses = useSelector((state) => state.courses);
  const params = useParams()

  useEffect(() => {
    if (params) {
      dispatch(fetchLessons(params))
      dispatch(fetchCourse(params))
    }
  }, [params])


  return <MainLayout backPath={`/courses/${courses.courseData.length ? courses.courseData[0].course_category_id : ""}`} title={courses.courseData.length ? courses.courseData[0].name : ""}>

  <div className='flex flex-col space-y-5  p-5'>

      {courses.courseData.length > 0 && <div className='flex  items-center justify-center'>
        <img className='object-cover w-52' src={courses.courseData[0].image_link} />
      </div>}

      {courses.courseData.length > 0 && <div className=' text-sm py-5 text-neutral-500 text-justify' dangerouslySetInnerHTML={{ __html: courses.courseData[0].content }} />}

      {courses.courseData.length > 0 && <div className='text-justify leading-9 text-sm' dangerouslySetInnerHTML={{ __html: courses.courseData[0].description }} />}

      {lessons.data.length >0 && <div className=' border border-neutral-200 text-xs rounded-xl p-3 mt-5'>
        <ul className='flex flex-col space-y-3'>

          {lessons.data.map((lesson, ls) => {
            return <li key={ls}>
              <Link href={`/lessons/${lesson.id}`} className={`flex items-center ${ls + 1 < lessons.data.length ? "border-b border-neutral-200 " : ""} cursor-pointer hover:bg-neutral-100 px-2 py-3 justify-between`}>
                <div className='flex items-center gap-2'>
                  <svg className=' shrink-0 w-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0748 7.50835C9.74622 6.72395 8.25 7.79065 8.25 9.21316V14.7868C8.25 16.2093 9.74622 17.276 11.0748 16.4916L15.795 13.7048C17.0683 12.953 17.0683 11.047 15.795 10.2952L11.0748 7.50835ZM9.75 9.21316C9.75 9.01468 9.84615 8.87585 9.95947 8.80498C10.0691 8.73641 10.1919 8.72898 10.3122 8.80003L15.0324 11.5869C15.165 11.6652 15.25 11.8148 15.25 12C15.25 12.1852 15.165 12.3348 15.0324 12.4131L10.3122 15.2C10.1919 15.271 10.0691 15.2636 9.95947 15.195C9.84615 15.1242 9.75 14.9853 9.75 14.7868V9.21316Z" fill="#b0b0b0"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#b0b0b0"></path> </g></svg>
                  <span className=' text-neutral-500'>{lesson.name}</span>
                </div>
                <span className='text-[#19C472] font-bold'>{lesson.duration}</span>
              </Link>
            </li>
          })}

        </ul>

      </div>}

    </div>

  </MainLayout>
}
