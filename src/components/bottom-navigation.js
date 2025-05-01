import Link from "next/link"
import { usePathname } from "next/navigation"

export default () => {

    const pathName = usePathname()

    return <div class=" fixed bottom-0 bg-white left-0 right-0 w-full overflow-hidden max-w-[450px] mx-auto h-16  rounded-t-4xl p-3  shadow-[0px_0px_13px_0px_#00000059] gap-9 z-50">
        <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <Link href="/" class="flex hover:cursor-pointer rounded-3xl justify-center   items-center">
                <img className="w-7" src={pathName == "/" ? "/images/home-active.png" : "/images/home.png"} />
            </Link>
            <Link href="/events" class="flex hover:cursor-pointer rounded-3xl justify-center   items-center">
                <img className="w-7" src={pathName && pathName.includes("/events") ? "/images/events-active.png" : "/images/events.png"}  />
            </Link>
            <Link href="/courses" class="flex hover:cursor-pointer rounded-3xl justify-center   items-center">
                <img className="w-7" src={pathName && (pathName.includes("/courses") || pathName.includes("/lessons")) ? "/images/courses-active.png" : "/images/courses.png"}/>
            </Link>
            <Link href="/categories" class={`flex hover:cursor-pointer rounded-3xl justify-center ${pathName && pathName.includes("/categories") ? "" : "grayscale"}    items-center`}>
                <img className="w-7" src="/images/shop.png"  />
            </Link>
        </div>
    </div>
}