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
      <div className=' grid grid-cols-3  gap-5'>
        {products.data.map((product, pr) => {
          return <Link key={pr} href={`/products/${product.id}`} className={`flex flex-col space-y-3 `} >
            <img className="object-cover  rounded-xl" src={product.image_link} />
            <span className='line-clamp-1 text-right text-white text-sm'>{product.name}</span>
            <span class="w-full font-bold text-white">{product.price_formatter} تومان</span>
          </Link>
        })}
      </div>
    </div>

  </MainLayout>
}
