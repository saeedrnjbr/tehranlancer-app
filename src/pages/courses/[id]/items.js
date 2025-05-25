import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourseCategoryTrees } from '../../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Home() {

  const dispatch = useDispatch()

  const params = useParams()
  const courseCategories = useSelector((state) => state.courseCategories);

  useEffect(() => {
    dispatch(fetchCourseCategoryTrees(params))
  }, [params])


  return <MainLayout  backPath="/courses" background='bg-[#1AA662]' title="گروه‌بندی دوره‌ها">

    <div className='flex flex-col space-y-5  p-5'>

      <p className=' text-white my-5 text-lg mb-10 text-center font-bold'>جهت ورود به دوره ها اشتراک خود را خریداری نمایید </p>

      {courseCategories.courseCategoryTreesData.length > 0 && <div className=' grid grid-cols-2 gap-3'>

        {courseCategories.courseCategoryTreesData.map((category, ec) => {
          return <Link href={`/courses/${category.id}`} key={ec} className=' bg-white rounded-xl drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)] p-5 flex items-center justify-center '>
            <span className=' text-neutral-600 text-base'>{category.name}</span>
          </Link>
        })}
      </div>}

    </div>


  </MainLayout>
}
