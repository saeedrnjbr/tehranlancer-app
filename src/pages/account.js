
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useFormik } from 'formik';
import { fetchUserLogin, fetchUserVerify } from './api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import moment from "jalali-moment";
import Button from '@/components/button';

export default function Home() {

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch()
  const [submitted, setSubmitted] = useState(false)
  const [verifySubmitted, setVerifySubmitted] = useState(false)
  const [action, setAction] = useState("login")
  const [mobile, setMobile] = useState()
  const [expiredAt, setExpiredAt] = useState()
  const router = useRouter()


  const formik = useFormik({
    initialValues: {
      mobile: '',
    },
    onSubmit: values => {
      setMobile(values.mobile)
      dispatch(fetchUserLogin(values))
      setSubmitted(true)
    },
  });

  const verifyFormik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: values => {
      setMobile(values.mobile)
      dispatch(fetchUserVerify(values))
      setVerifySubmitted(true)
    },
  });


  useEffect(() => {

    if (expiredAt != undefined) {

      const countDownDate = expiredAt * 1000

      var x = setInterval(function () {

        var now = moment().locale("fa").valueOf()
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("demo")) {
          document.getElementById("demo").classList.remove("hidden")
          document.getElementById("demo").innerHTML = "<span>زمان باقی‌مانده تا ارسال مجدد رمز:</span>  " + "<span>" + minutes + "</span>" + ":"
            + "<span>" + seconds + "</span>";
        }

        if (distance < 0 && document.getElementById("demo")) {
          clearInterval(x);
          document.getElementById("demo").classList.add("hidden")
          document.getElementById("reset").classList.remove("hidden")
        }

      }, 1000);

    }

  }, [expiredAt])


  if (users.error && submitted) {
    toast.error(users.message)
    setSubmitted(false)
  }

  if (users.data && users.data.length > 0 && submitted) {
    setSubmitted(false)
    setExpiredAt(users.data[0].expired_at)
    setAction("verify")
  }

  if (users.verifyError && verifySubmitted) {
    toast.error(users.message)
    setVerifySubmitted(false)
  }

  if (users.verifyData.length > 0 && verifySubmitted) {
    setVerifySubmitted(false)
    localStorage.setItem("lancerToken", users.verifyData[0].token)
    router.push("/dashboard")
  }


  const resetCode = () => {
    document.getElementById("reset").classList.add("hidden")
    dispatch(fetchUserLogin({ mobile }))
    setSubmitted(true)
  }

  return <MainLayout navigationVisible={false} title='حساب کاربری'>

    <div className='pt-40' >

      {action == "login" && <form className='flex flex-col space-y-4  px-10 text-center' onSubmit={formik.handleSubmit}>

        <h3 className='text-2xl font-semibold text-primary'>برای استفاده از امکانات اپلیکیشن باید عضو لنسر بشی!</h3>

        <p className='text-sm text-secondary'>لطفا شماره موبایل خود را وارد کنید</p>

        <input name='mobile' onChange={formik.handleChange} className='rounded-xl border border-neutral-200 w-full text-left px-3 py-4 mt-5 placeholder-neutral-400 ' placeholder='شماره موبایل' />

        <p className='text-right text-sm text-secondary'>ورود شما به معنای پذیرش <span className='text-primary-green font-semibold px-1'>قوانین</span> است.</p>

        <Button  loading={users.isLoading} disabled={submitted} title="دریافت کد" />

      </form>
      }

      {action == "verify" && <form className='flex flex-col space-y-4  px-10 text-center' onSubmit={verifyFormik.handleSubmit}>

        <h3 className='text-2xl font-semibold text-primary'>ارسال کد تایید</h3>

        <p className='text-sm text-secondary'>لطفا کد ارسالی به شماره <b>{mobile}</b> را وارد کنید</p>

        <input name='code' onChange={verifyFormik.handleChange} className='rounded-xl border border-black w-full text-left px-3 py-4 mt-5 placeholder-neutral-400' placeholder='کد تایید' />

        <div className="py-2 text-secondary text-sm">
          <div id="demo" className="hidden"></div>
          <span id='reset' onClick={() => resetCode()} className='cursor-pointer hidden'>دریافت مجدد کد</span>
        </div>

        <Button loading={users.verifyIsLoading}  disabled={submitted} title="ورود به حساب کاربری" />

      </form>}

    </div>

  </MainLayout>


}
