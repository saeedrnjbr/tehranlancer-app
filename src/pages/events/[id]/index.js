import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEvents } from '../../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import Link from 'next/link';

export default function Home() {

  const dispatch = useDispatch()
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  return <MainLayout backPath="/events" title="رویدادها">

    <div className='flex flex-col p-5 bg-[#1AA662] h-screen'>

      {events.data && events.data.length > 0 && <div className=' grid grid-cols-1 space-y-5 '>

        {events.data.map((event, ec) => {
          return <Link className=' bg-white rounded-2xl  flex items-center px-3 py-4 drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)]' href={`/events/${event.id}/request`} key={ec}>
            <img className='h-20' src={event.image_link} />
            <div className='flex flex-col space-y-2'>
              <span className='text-sm line-clamp-1 px-4 block'>{event.name}</span>

              {event.state == "expired" && <div className='flex items-center gap-2 px-4'>
                <img className='w-4' src="/images/lock.png" />
                <span className='text-red-500 text-sm'>منقضی شده است</span>
              </div>}

              {event.state != "expired" && <div className='flex items-center gap-2 px-4'>
                <img className='w-3' src="/images/processing.png" />
                <span className=' text-amber-600 text-sm'>در حال ثبت‌نام</span>
              </div>}

            </div>
          </Link>
        })}

      </div>
      }

    </div>


  </MainLayout>
}
