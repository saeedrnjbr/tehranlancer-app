import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFreelancers } from '../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import Link from 'next/link';

export default () => {

  const dispatch = useDispatch()

  const freelancers = useSelector((state) => state.freelancers);

  useEffect(() => {
    dispatch(fetchFreelancers())
  }, [])

  return <MainLayout background='bg-[#1AA662]' title="فریلنسرها">

    <div className='grid grid-cols-2 gap-5  p-5 '>
      {freelancers.data.map((freelancer, fr) => {
        return <div key={fr} class={` bg-white border mb-1 border-gray-200 rounded-lg shadow-[0px_1px_6px_0px_rgba(0,_0,_0,_0.1)]  px-2 py-3`}>
          <Link href={`/freelancers/${freelancer.id}`} className='flex items-center space-x-2'>
            <img class="w-16 h-16 rounded-full " src={freelancer.avatar_link} alt="" />
            <div className='flex flex-col space-y-2'>
              <span className=' font-semibold text-sm  text-primary'>{freelancer.nick_name}</span>
              <span className=' text-secondary text-xs'>{freelancer.age} سال</span>
            </div>
          </Link>
        </div>
      })}
    </div>


  </MainLayout>
}
