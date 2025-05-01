import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourseCategoryTrees } from '../api';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/main-layout';
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import { IoMdArrowDropright } from "react-icons/io";
import { useRouter } from 'next/router';

export default function Home() {

  const dispatch = useDispatch()
  const router = useRouter()

  const courseCategories = useSelector((state) => state.courseCategories);

  useEffect(() => {
    dispatch(fetchCourseCategoryTrees())
  }, [])


  const data = flattenTree({
    name: "",
    children: courseCategories.courseCategoryTreesData,
  });

  const ArrowIcon = ({ isOpen, className }) => {
    const baseClass = "arrow";
    const classes = cx(
      baseClass,
      { [`${baseClass}--closed`]: !isOpen },
      { [`${baseClass}--open`]: isOpen },
      className
    );
    return <IoMdArrowDropright className={classes} />;
  };

  const handleElementClick = (element) => {
    if (element.children.length == 0) {
      router.push(`/courses/${element.id}`)
    }
  }

  return <MainLayout background='bg-[#1AA662]'  title="گروه‌بندی دوره‌ها">

  <div className='flex flex-col space-y-5  p-5'>

      <p className=' text-white my-5 text-lg mb-10 text-center font-bold'>جهت ورود به دوره ها اشتراک خود را خریداری نمایید </p>

      <TreeView
        data={data}
        defaultExpandedIds={[1]}
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          isDisabled,
          getNodeProps,
          level,
          handleExpand,
        }) => {
          return (
            <div
              {...getNodeProps({ onClick: handleExpand })}
              style={{
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              {isBranch && <ArrowIcon isOpen={isExpanded} />}
              <span onClick={() => handleElementClick(element)} className="name text-white cursor-pointer hover:text-[#19C472]">
                {element.name}
              </span>
            </div>
          );
        }}
      />
    </div>


  </MainLayout>
}
