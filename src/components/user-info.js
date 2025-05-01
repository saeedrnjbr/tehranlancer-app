export default ({ users }) => {

    const logoutUser = () => {
        localStorage.removeItem("lancerToken")
        window.location.href = "/"
    }

    return <div class="relative">
        <div className="w-full">
            <div className='flex items-center bg-black/40 py-2 text-white justify-around mt-5'>
                <span>نام کاربری شما</span>
                {users.currentData.length > 0 && <span>{users.currentData[0].mobile}</span>}
                <span onClick={() => logoutUser()} className='text-sm bg-[#35C27F] p-2  cursor-pointer  text-white  rounded-full'>
                    <img src="/images/power-off.png" className="w-8" />
                </span>
            </div>
        </div>
        <div className="bg-[#35C27F]  grid grid-cols-2 rounded-full mx-4 mt-4 py-3 gap-2 text-white">
            <div className="flex items-center flex-col">
                <img src="/images/diamond.png" />
                <span className="text-base font-bold">کیف پول  (ریال)</span>
                <span>0</span>
            </div>
            <div className="flex items-center flex-col">
                <img className="w-8" src="/images/point.png" />
                <span className="text-base font-bold">تعداد کوپن</span>
                <span>0</span>
            </div>
        </div>
    </div>
}