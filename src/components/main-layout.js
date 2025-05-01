import BottomNavigation from '@/components/bottom-navigation';
import { fetchUserCurrent } from '@/pages/api';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default ({ background="bg-white", children, title = "", backPath = "/", navigationVisible = true }) => {

    const users = useSelector((state) => state.users);
    
    const dispatch = useDispatch()
    const pathName = usePathname()
    const router = useRouter()
    const [current, setCurrent] = useState()

    useEffect(() => {
        dispatch(fetchUserCurrent())
    }, [])

    useEffect(() => {
        setCurrent(users)
    }, [users])

    if (current == undefined) {
        return <Fragment></Fragment>
    }

    if (current.currentError && pathName.includes("/dashboard")) {
        router.push("/account")
    }

    return (
        <div className={`${background} relative min-h-screen border-x border-slate-200 w-full max-w-[450px] mx-auto`}>

            <div className="flex p-5 bg-white items-center justify-between ">

                {pathName == "/" ? <svg className='flex cursor-pointer shrink-0 size-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="5" cy="12" r="2" stroke="#A1A1A1" stroke-width="1.5"></circle> <circle cx="12" cy="12" r="2" stroke="#A1A1A1" stroke-width="1.5"></circle> <circle cx="19" cy="12" r="2" stroke="#A1A1A1" stroke-width="1.5"></circle> </g></svg>: <div></div>}

                <span className=" text-primary text-xl font-extrabold">{title}</span>

                {users.currentError == undefined && <div className="animate-spin inline-block  size-6 border-[3px] border-current border-t-transparent text-[#19C472] rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>}

                {users.currentError != undefined && <Fragment>

                    {(pathName == "/" && users.currentError) && <Link href="/account">
                        <img className="w-8" src="/images/profile.png" />
                    </Link>}

                    {(pathName == "/" && users.currentData && users.currentData.length > 0) && <Link className=' bg-green-100 rounded-full p-1 px-3 text-primary-green ' href="/dashboard">
                        داشبورد
                    </Link>}

                </Fragment>}

                {pathName != "/" && <Link href={backPath}>
                    <img className='flex shrink-0 size-8' src="/images/back.png" />
                </Link>}

            </div>
            <div className='flex flex-col space-y-10'>
                {children}
                {navigationVisible && <BottomNavigation />}
            </div>
        </div>
    );
}
