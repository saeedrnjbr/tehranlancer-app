import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovie } from '../../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useParams } from 'next/navigation';
import ReactPlayer from 'react-player'

export default function Home() {

  const dispatch = useDispatch()
  const params = useParams()
  const movies = useSelector((state) => state.movies);

  useEffect(() => {
    if (params) {
      dispatch(fetchMovie(params))
    }
  }, [params])


  return <MainLayout  backPath="/movies" title={movies.movieData.length ? movies.movieData[0].name : ""}>

    {movies.movieData.length > 0 && <div>

      <div className=" py-2 mb-5 bg-black">
        <ReactPlayer playing={true} width="100%" light={<img  src={movies.movieData[0].thumbnail_link} />} controls url={movies.movieData[0].link} />
      </div>

      <div className='px-5 flex flex-col space-y-3'>
        <div className='flex items-center justify-between pb-5'>
          <h3 className='font-bold text-xl'>{movies.movieData[0].name}</h3>
          <span className='text-xs  bg-[#FFD53F] p-1.5 px-4 rounded-r-xl text-black'>رده سنی تا {movies.movieData[0].age_group} سال - {movies.movieData[0].genre.name}</span>
        </div>
        <p className=' text-justify text-neutral-500 leading-8' dangerouslySetInnerHTML={{ __html: movies.movieData[0].description }}></p>
      </div>
  
    </div>}


  </MainLayout>
}
