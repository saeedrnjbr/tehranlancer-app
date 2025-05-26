import "@/styles/globals.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { usePathname, useSearchParams } from "next/navigation";

import NProgress from 'nprogress'
import { useEffect } from "react";
import ReduxProvider from "@/provider";

export default function App({ Component, pageProps }) {

  const pathname = usePathname()
  const searchParams = useSearchParams()

 

  return <ReduxProvider>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <Component {...pageProps} />
  </ReduxProvider>;
}
