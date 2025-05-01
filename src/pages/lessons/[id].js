import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import { useParams } from 'next/navigation';
import { fetchLesson } from '@/pages/api';
import ReactPlayer from 'react-player';
import Button from '@/components/button';


export default function Home() {

    const dispatch = useDispatch()
    const lessons = useSelector((state) => state.lessons);
    const params = useParams()

    useEffect(() => {
        if (params) {
            dispatch(fetchLesson(params))
        }
    }, [params])


    return <MainLayout backPath={`/courses/${lessons.lessonData.length ? lessons.lessonData[0].course_id : ""}/lessons`} title={lessons.lessonData.length ? lessons.lessonData[0].name : ""}>

        <div className='flex flex-col p-5 '>

        
            {lessons.lessonData.length > 0 && <div className=" py-2 bg-black">
                <ReactPlayer playing={true} width="100%" light={<img  src={lessons.lessonData[0].thumbnail_link} /> } controls url={lessons.lessonData[0].link} />
            </div>}

            <Button title="بریم بازی آزمون" />

        </div>

    </MainLayout>
}
