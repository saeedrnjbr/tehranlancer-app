import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategory, fetchProducts } from '../../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function Home() {

  const dispatch = useDispatch()
  const params = useParams()

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (params) {
      dispatch(fetchProducts(params))
      dispatch(fetchCategory(params))
    }
  }, [params])



  return <MainLayout background="bg-[#1AA662]" backPath="/categories" title={`محصولات ${categories.categoryData.length > 0 ? categories.categoryData[0].name : ""}`}>

    <div className='flex flex-col space-y-5  p-5'>
      <div className=' grid grid-cols-2  gap-3'>
        {products.data.map((product, pr) => {
          return <Link href={`/products/${product.id}`} key={pr} class={`relative flex mb-1 w-full flex-col overflow-hidden rounded-lg bg-white drop-shadow-sm  shadow-[0_5px_5px_rgba(0,0,0,0.15)]`}>
            <div class="relative mx-3 mt-3 flex h-44 overflow-hidden rounded-xl" href="#">
              <img className='object-cover w-full' src={product.image_link} />
            </div>
            <div class="mt-4 px-5 pb-2 flex flex-col space-y-3">
              <h5 class="text-sm line-clamp-2  tracking-tight text-secondary">{product.name}</h5>
              <span class="text-sm w-full font-bold text-primary-green">{product.price_formatter} تومان</span>
            </div>
          </Link>
        })}
      </div>
    </div>

  </MainLayout>
}
