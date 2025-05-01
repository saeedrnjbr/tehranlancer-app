import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ContentBlock from '@/components/content-block';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourses, fetchEvents, fetchFreelancers, fetchMovies, fetchProducts, fetchSliders, fetchUserCurrent } from './api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import Link from 'next/link';

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
    {sliders.data.length > 0 && <div >
      <Swiper
        slidesPerView={1.5}
        initialSlide={1}
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

    {movies.data.length > 0 && <ContentBlock type="movies" more="/movies" items={movies.data} title="فیلم پیشنهادی" />}

    {events.data.length > 0 && <ContentBlock size="32" more="/events" perView={1.5} items={events.data} title="رویدادها" />}

    {courses.data.length > 0 && <div className='py-2'>
      <div>
        <div className='flex mb-5 px-5 items-center justify-between'>
          <h3 className='text-right text-xl border-r-10 border-[#19C472] pr-2 font-bold '>آموزش ببین</h3>
          <Link href="/courses" className='text-primary-green cursor-pointer font-semibold'>
            <img className='w-7' src="/images/back.png" />
          </Link>
        </div>
        <div className='pr-5'>
          <Swiper
            slidesPerView={1.5}
            spaceBetween={15}
          >
            {courses.data.length > 0 && courses.data.map((course, cr) => {
              return <SwiperSlide key={cr}>
                <Link href={`/courses/${course.id}/lessons`} className='bg-white h-32 mb-1 rounded-xl  drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)] m-1  py-5 px-5 flex items-center gap-5'>
                  <img className=' w-16' src={course.image_link} />
                  <div className='flex flex-col space-y-2'>
                    <span className='font-bold'>{course.name}</span>
                    <p className=' text-xs text-neutral-500 line-clamp-2'>{course.content}</p>
                  </div>
                </Link>
              </SwiperSlide>
            })}
          </Swiper>
        </div>
      </div>
    </div>}

    {freelancers.data.length > 0 && <div >
      <div>
        <div className='flex mb-5 px-5 items-center justify-between'>
          <h3 className='text-right text-xl border-r-10 border-[#19C472] pr-2 font-bold '>فریلنسر شو</h3>
          <Link href="/freelancers" className='text-primary-green cursor-pointer font-semibold'>
            <img className='w-7' src="/images/back.png" />
          </Link>
        </div>
        <div className='pr-5'>
          <Swiper
            slidesPerView={1.5}
            spaceBetween={15}
          >
            {freelancers.data.map((freelancer, fr) => {
              return <SwiperSlide key={fr}>
                <div class={`bg-white mb-1  rounded-lg  drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)]  px-2 py-3 ${fr == freelancers.data.length - 1 ? "ml-5" : ""}`}>
                  <Link href={`/freelancers/${freelancer.id}`} className='flex items-center space-x-2'>
                    <img class="w-16 h-16 rounded-full " src={freelancer.avatar_link} alt="" />
                    <div className='flex flex-col space-y-2'>
                      <span className=' font-semibold text-sm text-primary'>{freelancer.nick_name}</span>
                      <span className=' text-secondary text-xs'>{freelancer.age} سال</span>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            })}
          </Swiper>
        </div>
      </div>
    </div>}


    {products.data.length > 0 && <div className='pb-16'>
      <div>
        <div className='flex mb-5 px-5 items-center justify-between '>
          <h3 className='text-right text-xl border-r-10 border-[#19C472] pr-2 text-primary font-bold '>هرچی میخوای بخر</h3>
          <Link href="/categories" className='text-primary-green cursor-pointer font-semibold'>
            <img className='w-7' src="/images/back.png" />
          </Link>
        </div>
        <div className='pr-5'>
          <Swiper
            slidesPerView={2.5}
            spaceBetween={15}
          >
            {products.data.map((product, pr) => {
              return <SwiperSlide key={pr}>
                <Link href={`/products/${product.id}`} class={`relative h-72 flex mb-1 w-full flex-col overflow-hidden rounded-lg  bg-white drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)] ${pr == products.data.length - 1 ? "ml-5" : ""}`}>
                  <div class="relative mx-3 mt-3 flex h-44 overflow-hidden rounded-xl" href="#">
                    <img className='object-cover w-full' src={product.image_link} />
                  </div>
                  <div class="mt-4 px-5 pb-2  flex flex-col space-y-3">
                    <h5 class="line-clamp-2  tracking-tight text-secondary text-sm">{product.name}</h5>
                    <span class="w-full absolute bottom-4 font-bold text-primary-green">{product.price_formatter} تومان</span>
                  </div>
                </Link>
              </SwiperSlide>
            })}
          </Swiper>
        </div>
      </div>
    </div>}
  </MainLayout>
}
