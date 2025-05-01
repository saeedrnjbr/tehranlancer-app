export default () => {
    return <div className=" flex items-center justify-center h-screen bg-white max-w-[450px] mx-auto">
        <div className="animate-spin inline-block  size-8 border-[3px] border-current border-t-transparent text-[#19C472] rounded-full" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
}