import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourseCategoryTrees } from '../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import Link from 'next/link';

export default function Home() {

  const dispatch = useDispatch()

  const courseCategories = useSelector((state) => state.courseCategories);

  useEffect(() => {
    dispatch(fetchCourseCategoryTrees())
  }, [])



    if (courseCategories.courseCategoryTreesIsLoading) {
  
      return <MainLayout background="bg-[#1AA662]" title="گروه‌بندی دوره‌ها">
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col space-y-5 p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-5 flex items-center justify-center animate-pulse h-12"></div>
              <div className="bg-white rounded-xl p-5 flex items-center justify-center animate-pulse h-12"></div>
              <div className="bg-white rounded-xl p-5 flex items-center justify-center animate-pulse h-12"></div>
              <div className="bg-white rounded-xl p-5 flex items-center justify-center animate-pulse h-12"></div>
              <div className="bg-white rounded-xl p-5 flex items-center justify-center animate-pulse h-12"></div>
              <div className="bg-white rounded-xl p-5 flex items-center justify-center animate-pulse h-12"></div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 w-full overflow-hidden max-w-[450px] mx-auto h-20 rounded-t-4xl p-3 gap-9 z-50">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
              <div className="flex flex-col rounded-3xl justify-center items-center">
                <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-3 w-10 rounded-md mt-1.5 animate-pulse"></div>
              </div>
              <div className="flex flex-col rounded-3xl justify-center items-center">
                <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-3 w-10 rounded-md mt-1.5 animate-pulse"></div>
              </div>
              <div className="flex flex-col rounded-3xl justify-center items-center">
                <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-3 w-10 rounded-md mt-1.5 animate-pulse"></div>
              </div>
              <div className="flex flex-col rounded-3xl justify-center items-center">
                <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-3 w-10 rounded-md mt-1.5 animate-pulse"></div>
              </div>
              <div className="flex flex-col rounded-3xl justify-center items-center">
                <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-3 w-10 rounded-md mt-1.5 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
  
    }
    

  return <MainLayout background='bg-[#1AA662]' title="گروه‌بندی دوره‌ها">

    <div className='flex flex-col space-y-5  p-5'>

      <p className=' text-white my-5 text-lg mb-10 text-center font-bold'>جهت ورود به دوره ها اشتراک خود را خریداری نمایید </p>

      {courseCategories.courseCategoryTreesData.length > 0 && <div className=' grid grid-cols-2 gap-3'>

        {courseCategories.courseCategoryTreesData.map((category, ec) => {
          return <Link href={`/courses/${category.id}/items`} key={ec} className=' bg-white rounded-xl drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)] p-5 flex items-center justify-center '>
            <span className=' text-neutral-600 text-base'>{category.name}</span>
          </Link>
        })}
      </div>}


    
    </div>


  </MainLayout>
}
