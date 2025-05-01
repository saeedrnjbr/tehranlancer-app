
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Button from '@/components/button';
import { useParams } from 'next/navigation';
import { fetchFreelancer, fetchFreelancerRequest } from '@/pages/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function Home() {

    const dispatch = useDispatch()
    const freelancers = useSelector((state) => state.freelancers);
    const [submitted, setSubmitted] = useState(false)
    const params = useParams()
    const router = useRouter()

    console.log(freelancers)

    const formik = useFormik({
        initialValues: {
            owner: '',
            address: '',
            mobile: '',
            stack: '',
            project_file: '',
            project_name: '',
            project_description: '',
        },
        onSubmit: values => {
            dispatch(fetchFreelancerRequest(values))
            setSubmitted(true)
        },
    });

    useEffect(() => {
        if (params) {
            dispatch(fetchFreelancer(params))
            formik.setFieldValue("freelancer_id", params.id)
        }
    }, [params])

    if (freelancers.freelancerRequestError && submitted) {
        toast.error(freelancers.message)
        setSubmitted(false)
    }

    if (freelancers.freelancerRequestData.length > 0 && submitted) {
        setSubmitted(false)
        toast.success("درخواست با موفقیت ثبت شد")
        setTimeout(() => location.reload(), 1000)
    }


    return <MainLayout navigationVisible={false} title='داشبورد'>

        <div className='flex relative h-[400px] flex-col space-y-2'>
            <img className=' object-cover w-full h-full' src="/images/frame.png" />
        </div>


        <div className='flex flex-col space-y-2 pb-16'>

            <p className='text-center font-semibold'>جهت ثبت درخواست فرم زیر را تکمیل نمایید</p>

            {freelancers.freelancerData.length > 0 && <p className='text-center w-2/3 mx-auto mt-3 text-base text-indigo-600'>{freelancers.freelancerData[0].nick_name}</p>}

            <form onSubmit={formik.handleSubmit} method='post' encType='multipart/form-data' class="flex text-sm flex-col space-y-5 px-8 mt-5">

                {params && <input type='hidden' name='event_id' value={params.id} />}

                <div className='flex items-center space-x-3'>
                    <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        نام کارفرما
                    </label>
                    <input name='owner' onChange={formik.handleChange} class="bg-white  appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
                </div>


                <div className='flex items-center space-x-3'>
                    <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        شماره تماس
                    </label>
                    <input name='mobile' onChange={formik.handleChange} class="bg-white  appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
                </div>

                <div className='flex items-center space-x-3'>
                    <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        آدرس
                    </label>
                    <input name='address' onChange={formik.handleChange} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
                </div>

                <div className='flex items-center space-x-3'>
                    <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        حوزه کاری
                    </label>
                    <input name='stack' onChange={formik.handleChange} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
                </div>

                <div className='flex items-center space-x-3'>
                    <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        آپلود پروپوزال
                    </label>
                    <input onChange={(e) => {
                        if (e.target.files[0]) {
                            formik.setFieldValue("project_file", e.target.files[0]);
                        }
                    }} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="file" />
                </div>


                <div className='flex items-center space-x-3'>
                    <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        عنوان پروژه
                    </label>
                    <input name='project_name' onChange={formik.handleChange} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" />
                </div>

                <div className='flex items-center space-x-3'>
                    <label class="block w-1/3 text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        توضیح پروژه
                    </label>
                    <textarea rows={4} name='project_description' onChange={formik.handleChange} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight" id="inline-full-name" type="text" ></textarea>
                </div>

                <Button loading={freelancers.freelancerRequestIsLoading} title="ثبت درخواست" />

            </form>

        </div>
        
    </MainLayout>


   

}
