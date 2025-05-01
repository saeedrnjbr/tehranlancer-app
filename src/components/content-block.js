
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

export default ({ title, items, perView = 2.5, size = "h-54", more = "/", type = "events" }) => {
    return <div>
        <div>
            <div className='flex px-5 mb-5 items-center justify-between'>
                <h3 className='text-right border-r-10 border-[#19C472] pr-2 text-xl text-primary font-bold '>{title}</h3>
                <Link href={more} className='text-primary-green cursor-pointer font-semibold'>
                    <img className='w-7' src="/images/back.png" />
                </Link>
            </div>
            <div className='pr-5'>
                {items && <Swiper
                    slidesPerView={perView}
                    spaceBetween={20}
                >
                    {items.map((item, im) => {

                        let link = `/events/${item.id}/request`

                        if (type == "movies") {
                            link = `/movies/${item.id}`
                        }

                        return <SwiperSlide key={im}>
                            <Link href={link} className={`flex flex-col space-y-3 ${im == items.length - 1 ? "ml-5" : ""}`} >
                                <div class={`relative flex ${size} overflow-hidden rounded-xl`}>
                                    <img className="object-cover w-full rounded-2xl" src={item.image_link} />
                                </div>
                                <span className='line-clamp-2 text-right text-black text-sm'>{item.name}</span>
                            </Link>
                        </SwiperSlide>
                    })}
                </Swiper>}
            </div>
        </div>
    </div>
}