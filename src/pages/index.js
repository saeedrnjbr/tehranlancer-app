import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ContentBlock from '@/components/content-block';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourses, fetchEvents, fetchFreelancers, fetchMovies, fetchProducts, fetchSliders, fetchUserCurrent } from './api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import Link from 'next/link';
import BoxLoading from '@/components/box-loading';

export default function Home() {

  const dispatch = useDispatch()

  const movies = useSelector((state) => state.movies);
  const events = useSelector((state) => state.events);
  const sliders = useSelector((state) => state.sliders);
  const courses = useSelector((state) => state.courses);
  const products = useSelector((state) => state.products);
  const freelancers = useSelector((state) => state.freelancers);

  useEffect(() => {
    dispatch(fetchSliders())
    dispatch(fetchMovies())
    dispatch(fetchCourses())
    dispatch(fetchEvents())
    dispatch(fetchFreelancers())
    dispatch(fetchProducts())
  }, [])


  return <MainLayout title="خانه">
    {sliders.data.length > 0 && <div className='p-5 pb-0'>
      <Swiper
        slidesPerView={1.2}
        initialSlide={2}
        centeredSlides={true}
        loop
        autoplay={
          {
            delay: 5000
          }
        }
        spaceBetween={15}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
      >
        {sliders.data.length && sliders.data.map((slider, sl) => {
          return <SwiperSlide key={sl}>
            <Link href={slider.link}>
              <img className="rounded-2xl object-fill" src={slider.image_link} />
            </Link>
          </SwiperSlide>
        })}
      </Swiper>
    </div>}


    <ContentBlock type="movies" more="/movies" isLoading={movies.isLoading} items={movies.data} title="فیلم پیشنهادی" />

    <ContentBlock more="/events" items={events.data} isLoading={events.isLoading} title="رویدادها" />

    <ContentBlock more="/courses" items={courses.data} isLoading={courses.isLoading} title="آموزش ببین" />

    {freelancers.data.length > 0 && <div >
      <div className=" bg-white py-3">
        <div className='flex mb-5 px-5 items-center justify-between'>
          <h3 className='text-right text-base border-r-10 border-[#19C472] pr-2 font-bold '>فریلنسر شو</h3>
          <Link href="/freelancers" className='text-primary-green cursor-pointer font-semibold'>
            <img className='w-7' src="/images/back.png" />
          </Link>
        </div>
        <div className="mx-3 border border-neutral-200 rounded-2xl p-3">

          {freelancers.isLoading && <BoxLoading />}

          <Swiper
            slidesPerView={3.5}
            spaceBetween={20}
          >
            {freelancers.data.map((freelancer, fr) => {
              return <SwiperSlide key={fr}>
                <Link href={`/freelancers/${freelancer.id}`} className={`flex flex-col space-y-3 `} >
                  <img className="object-cover  rounded-xl" src={freelancer.avatar_link} />
                  <span className='line-clamp-2 text-right text-neutral-700 text-sm'>{freelancer.nick_name}</span>
                </Link>
              </SwiperSlide>
            })}
          </Swiper>
        </div>
      </div>
    </div>}


    {products.data.length > 0 && <div className='pb-16'>
      <div className=" bg-white py-3">
        <div className='flex mb-5 px-5 items-center justify-between '>
          <h3 className='text-right text-base border-r-10 border-[#19C472] pr-2 text-primary font-bold '>هرچی میخوای بخر</h3>
          <Link href="/categories" className='text-primary-green cursor-pointer font-semibold'>
            <img className='w-7' src="/images/back.png" />
          </Link>
        </div>
        <div className="mx-3 border border-neutral-300 rounded-xl p-3">
          <Swiper
            slidesPerView={3.5}
            spaceBetween={20}
          >
            {products.data.map((product, pr) => {
              return <SwiperSlide key={pr}>
                <Link href={`/products/${product.id}`} className={`flex flex-col space-y-3 `} >
                  <img className="object-cover  rounded-xl" src={product.image_link} />
                  <span className='line-clamp-2 text-right text-neutral-700 text-sm'>{product.name}</span>
                  <span class="w-full text-primary-green">{product.price_formatter} تومان</span>
                </Link>
              </SwiperSlide>
            })}
          </Swiper>
        </div>
      </div>
    </div>}
  </MainLayout>
}
