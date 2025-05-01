
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useEffect, useState } from 'react';
import { fetchCourseCategories, fetchCourses, fetchFreelancerLevels, fetchStoreFreelancerLevel } from './api';
import { useFormik } from 'formik';
import Button from '@/components/button';
import { toast } from 'react-toastify';
import Spinner from '@/components/spinner';
import UserInfo from '@/components/user-info';

export default function Home() {

  const dispatch = useDispatch()

  const courses = useSelector((state) => state.courses);

  const users = useSelector((state) => state.users);

  const freelancers = useSelector((state) => state.freelancers);

  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    dispatch(fetchCourses())
    dispatch(fetchFreelancerLevels())
  }, [])

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      avatar: '',
      level: '',
      gender: '',
      school: '',
      field: '',
      courses: []
    },
    onSubmit: values => {
      console.log(values)
      dispatch(fetchStoreFreelancerLevel(values))
      setSubmitted(true)
    },
  });

  if (freelancers.storeFreelancerLevelError && submitted) {
    toast.error(freelancers.message)
    setSubmitted(false)
  }

  if (freelancers.storeFreelancerLevelData.length > 0 && submitted) {
    setSubmitted(false)
    location.reload()
  }

  if (freelancers.freelancerLevelData == undefined) {
    return <Spinner />
  }

  if (freelancers.freelancerLevelData.length == 0) {
    
    return <MainLayout navigationVisible={false} title='داشبورد'>

      <div className='flex relative h-[400px] flex-col space-y-2'>
        <img className=' object-cover w-full h-full' src="/images/level.png" />
        <div className=' absolute top-0 py-3 left-0 right-0'>
          <UserInfo users={users} />
        </div>
      </div>

      <div className='flex flex-col space-y-2 '>

        <p className='text-center font-semibold'>اگه میخوای بدونی در چه مرحله ای از فریلنسری قرار داری </p>
        <p className='text-center font-semibold'>تمام اطلاعات زیر رو کامل و ثبتش کن</p>

        <form onSubmit={formik.handleSubmit} method='post' encType='multipart/form-data' class="flex text-sm flex-col space-y-3 px-8 mt-5">

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
              پروفایل
            </label>
            <input onChange={(e) => {
              if (e.target.files[0]) {
                formik.setFieldValue("avatar", e.target.files[0]);
              }
            }} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="file" />
          </div>

          <div className='flex items-center space-x-3'>
            <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              پایه تحصیلی
            </label>
            <select name='level' onChange={formik.handleChange} class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value="">پایه را انتخاب کنید</option>
              <option value="1">پایه اول</option>
              <option value="2">پایه دوم</option>
              <option value="3">پایه سوم</option>
              <option value="4">پایه چهارم</option>
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
              جنسیت
            </label>
            <select name='gender' onChange={formik.handleChange} class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value="">جنسیت را انتخاب کنید</option>
              <option value="female">دختر</option>
              <option value="male">پسر</option>
            </select>
          </div>

          <div className='flex items-center space-x-3'>
            <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              نام مدرسه
            </label>
            <input name='school' onChange={formik.handleChange} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
          </div>

          <div className='flex items-center space-x-3'>
            <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              رشته را انتخاب کنید
            </label>
            <select name='field' onChange={formik.handleChange} class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value="">انتخاب رشته</option>
              <option value="robotics">رباتیک</option>
              <option value="art">هنر</option>
              <option value="programming">برنامه نویسی</option>
              <option value="management">مدیریت</option>
            </select>
          </div>

          <div className='flex flex-col space-y-3'>
            <label class="block w-full py-5 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              کدام دوره ها را  قبلا گذرانده و مسلط هستید
            </label>
            <select name='courses' multiple onChange={formik.handleChange} class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              {courses.data && courses.data.map((course, cc) => {
                return <option key={cc} value={course.id}>{course.name}</option>
              })}
            </select>
          </div>

          <Button title="ثبت و تایید" />

        </form>

      </div>

    </MainLayout>

  }




  return <MainLayout navigationVisible={false} title='داشبورد'>

    <div className='flex relative h-[440px] flex-col  space-y-2'>

      <img className=' object-cover w-full h-full' src="/images/dashboard-user.png" />

      <div className=' absolute top-0 left-0 right-0'>

        <UserInfo users={users} />

        {users.currentData && users.currentData.length > 0 && <div className='flex items-center justify-center'>

          <div className='flex items-center flex-col mt-5 space-y-2'>
            <img className=' w-24 h-24 rounded-full border-6 border-[#35C27F]' src={users.currentData[0].freelancer_level.avatar_link} />
            <span className=' text-white font-bold'>{users.currentData[0].freelancer_level.nick_name}</span>
            <p className=' text-primary-green text-white text-sm font-bold py-2 px-6 bg-green-50 rounded-2xl'>سطح شما: {users.currentData[0].freelancer_level.level_result_fa}</p>
          </div>

        </div>}

      </div>

    </div>

  </MainLayout>

}
