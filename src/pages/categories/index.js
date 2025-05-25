import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import Link from 'next/link';

export default function Home() {

  const dispatch = useDispatch()

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])


  return <MainLayout background="bg-[#1AA662]" title="دسته‌بندی محصولات">

  <div className='flex flex-col space-y-5  p-5'>
     
      {categories.data.length > 0 && <div className=' grid grid-cols-2 gap-3'>

        {categories.data.map((category, ec) => {
          return <Link href={`/categories/${category.id}`} key={ec} className=' bg-white rounded-xl drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)] p-5 flex items-center justify-center '>
            <span className=' text-neutral-600 text-base'>{category.name}</span>
          </Link> 
        })}
      </div>}

    </div>

  </MainLayout>
}
