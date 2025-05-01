import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useParams } from 'next/navigation';
import { fetchProduct } from '@/pages/api';

export default function Home() {

  const dispatch = useDispatch()

  const products = useSelector((state) => state.products);
  const params = useParams()

  useEffect(() => {
    if (params) {
      dispatch(fetchProduct(params))
    }
  }, [params])


  return <MainLayout backPath="/" title={products.productData.length ? products.productData[0].name : ""}>

  <div className='flex flex-col space-y-5  p-5'>

      {products.productData.length > 0 && <div className='flex flex-col space-y-3'>

        <img className='object-cover w-full' src={products.productData[0].image_link} />

        <div className=' text-xs py-5 text-neutral-500 text-justify' dangerouslySetInnerHTML={{ __html: products.productData[0].content }} />

        <div className='text-justify leading-9 text-sm' dangerouslySetInnerHTML={{ __html: products.productData[0].description }} />

        <span class="w-full font-bold text-xl mt-5 text-primary-green">{products.productData[0].price_formatter} تومان</span>
     
        </div>}


    </div>

  </MainLayout>
}
