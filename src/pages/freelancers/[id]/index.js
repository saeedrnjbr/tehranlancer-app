import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFreelancer } from '../../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Home() {

  const dispatch = useDispatch()

  const freelancers = useSelector((state) => state.freelancers);
  const params = useParams()

  useEffect(() => {
    if (params) {
      dispatch(fetchFreelancer(params))
    }
  }, [params])


  return <MainLayout background='bg-white' backPath="/freelancers" title={freelancers.freelancerData.length > 0 ? freelancers.freelancerData[0].nick_name : ""}>

    <div className='grid grid-cols-12'>

      <div className='flex col-span-4 relative h-[250px] flex-col space-y-3'>

        {freelancers.freelancerData.length > 0 && <div className=' absolute top-0 left-0 right-0'>

          <div className='flex flex-col space-y-3 mt-5 items-center justify-center'>
            <img className=' rounded-full w-24 h-24' src={freelancers.freelancerData[0].avatar_link} alt="" />
            <span className=' text-primary-green text-white text-sm font-bold py-2 px-6  rounded-2xl'>{freelancers.freelancerData[0].nick_name}</span>
            <span className='text-white '>{freelancers.freelancerData[0].age} سال</span>
          </div>

        </div>}

      </div>


      {freelancers.freelancerData.length > 0 && <div className='flex col-span-8 flex-col space-y-2 gap-5 pb-24'>

        <div className='flex flex-col px-5 mt-5'>
          <div className='flex flex-col space-y-5'>
           <div className='flex flex-col space-y-3'>
              <span className=' bg-green-50 text-primary-green block py-2 px-2'>سن</span>
              <span className=' text-sm text-justify leading-8 text-neutral-500' dangerouslySetInnerHTML={{ __html: freelancers.freelancerData[0].age }}></span>
            </div>
            <div className='flex flex-col space-y-3'>
              <span className=' bg-green-50 text-primary-green block py-2 px-2'>تخصص</span>
              <span className=' text-sm text-justify leading-8 text-neutral-500' dangerouslySetInnerHTML={{ __html: freelancers.freelancerData[0].skills }}></span>
            </div>
            <div className='flex flex-col space-y-3'>
              <span className=' bg-green-50 text-primary-green block py-2 px-2'>سوابق کاری</span>
              <span className=' text-sm text-justify leading-8 text-neutral-500' dangerouslySetInnerHTML={{ __html: freelancers.freelancerData[0].about }}></span>
            </div>
            <div className='flex flex-col space-y-3'>
              <span className=' bg-green-50 text-primary-green block py-2 px-2'>علاقمندی ها</span>
              <span className=' text-sm text-justify leading-8  text-neutral-500' dangerouslySetInnerHTML={{ __html: freelancers.freelancerData[0].favorites }}></span>
            </div>
          </div>

          <Link href={`/freelancers/${freelancers.freelancerData[0].id}/request`} className='bg-primary-green relative text-center bg-no-repeat shadow-[3px_3px_3px_#098549]  disabled:bg-neutral-400 cursor-pointer text-lg font-semibold mt-5 text-white rounded-full px-3 py-2'>
            <img className=' absolute right-2 top-2' src="/images/ellipse.png" />
            <img className=' absolute left-2 top-2' src="/images/vector.png" />
            <span>درخواست همکاری</span>
          </Link>

        </div>



      </div>}

    </div>


  </MainLayout>
}
