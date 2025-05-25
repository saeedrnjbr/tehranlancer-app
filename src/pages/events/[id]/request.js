
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Button from '@/components/button';
import { useParams } from 'next/navigation';
import { fetchEvent, fetchEventReuqest } from '@/pages/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Home() {

  const dispatch = useDispatch()
  const events = useSelector((state) => state.events);
  const [submitted, setSubmitted] = useState(false)
  const params = useParams()
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      mobile: '',
      level: '',
      alternative_mobile: '',
      event_id: '',
    },
    onSubmit: values => {
      dispatch(fetchEventReuqest(values))
      setSubmitted(true)
    },
  });

  useEffect(() => {
    if (params) {
      dispatch(fetchEvent(params))
      formik.setFieldValue("event_id", params.id)
    }
  }, [params])

  if (events.eventRequestError && submitted) {
    toast.error(events.message)
    setSubmitted(false)
  }

  if (events.eventRequestData.length > 0 && submitted) {
    setSubmitted(false)
    toast.success("درخواست با موفقیت ثبت شد")
    setTimeout(() => location.reload(), 1000)
    router.push(`/events/${events.eventData.length ? events.eventData[0].event_category_id : 0}/request`)
  }


  return <MainLayout backPath={`/events/${events.eventData.length ? events.eventData[0].event_category_id : 0}`} navigationVisible={false} title='ثبت درخواست'>

    <div className='flex flex-col space-y-2 mt-10'>


      <p className='text-center font-semibold'>جهت ثبت درخواست فرم زیر را تکمیل نمایید</p>

      <img className='w-16 mx-auto my-4' src="/images/info.png" />

      {events.eventData.length > 0 && <p className='text-center w-2/3 mx-auto mt-3 text-base text-indigo-600'>{events.eventData[0].name}</p>}
      {events.eventData.length > 0 && <span className='text-base text-neutral-500 px-4 py-5 block' dangerouslySetInnerHTML={{ __html: events.eventData[0].description }}></span> }

      <form onSubmit={formik.handleSubmit} method='post' encType='multipart/form-data' class="flex text-sm flex-col space-y-5 px-8 mt-5">

        {params && <input type='hidden' name='event_id' value={params.id} />}

        <div className='flex items-center space-x-3'>
          <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            شماره موبایل
          </label>
          <input name='mobile' onChange={formik.handleChange} class="bg-white  appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
        </div>

        <div className='flex items-center space-x-3'>
          <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            نام
          </label>
          <input name='first_name' onChange={formik.handleChange} class="bg-white  appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
        </div>

        <div className='flex items-center space-x-3'>
          <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            نام خانوادگی
          </label>
          <input name='last_name' onChange={formik.handleChange} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
        </div>

        <div className='flex items-center space-x-3'>
          <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            پایه تحصیلی
          </label>
          <select name='level' onChange={formik.handleChange} class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option value="">انتخاب کنید</option>
            <option value="1">پایه اول</option>
            <option value="2">پایه دوم</option>
            <option value="3">پایه سوم</option>
            <option value="4">پایه چهارم</option>
            <option value="6">پایه ششم</option>
            <option value="5">پایه پنجم</option>
            <option value="7">پایه هفتم</option>
            <option value="8">پایه هشتم</option>
            <option value="9">پایه نهم</option>
            <option value="10">پایه دهم</option>
            <option value="11">پایه یازدهم</option>
            <option value="12">پایه دوازدهم</option>
          </select>
        </div>

        <div className='flex items-center space-x-3'>
          <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
            شماره ضروری
          </label>
          <input name='alternative_mobile' onChange={formik.handleChange} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
        </div>

        <Button loading={events.eventRequestIsLoading} title="ثبت درخواست" />

      </form>

    </div>

  </MainLayout>

}
