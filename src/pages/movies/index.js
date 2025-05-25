import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import Link from 'next/link';

export default () => {

  const dispatch = useDispatch()

  const movies = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies())
  }, [])

  return <MainLayout title="سرگرمی">

    <div className='grid grid-cols-3 gap-5 p-5 '>


      {movies.data.map((item, im) => {
        return <Link href={`/movies/${item.id}`} className={`flex relative flex-col space-y-3`} >
          <img className="object-cover rounded-2xl" src={item.image_link} />
          <span className='line-clamp-2 text-sm  text-neutral-700  font-semibold'>{item.name}, {item.genre.name}</span>
          <span className='text-xs absolute bg-[#FFD53F] left-0  -top-2 p-1.5 px-4 rounded-r-xl text-black'>رده سنی تا {item.age_group} سال</span>
        </Link>
      })}

    </div>


  </MainLayout>
}
