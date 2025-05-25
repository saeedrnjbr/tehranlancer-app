import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEventCategories } from '../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import Link from 'next/link';

export default function Home() {

  const dispatch = useDispatch()

  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventCategories())
  }, [])


  return <MainLayout background='bg-[#1AA662]' title="رویدادها">

    <div className='flex flex-col p-5'>

      <p className=' text-base pb-5 text-white'>جهت ثبت درخواست ثبت نام در هر کدام از رویدادهای زیر انتخاب کنید</p>

      <div className=' grid grid-cols-2 gap-3'>

        {events.eventCategoriesData.map((eventCategory, ec) => {
          return <Link href={`/events/${eventCategory.id}`} key={ec} className=' bg-white drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)]  rounded-xl  p-5 flex items-center justify-between '>
            <span className='text-base'>{eventCategory.name}</span>
            <img className='w-5' src="/images/back.png" />
          </Link>
        })}
        
      </div>

    </div>


  </MainLayout>
}
