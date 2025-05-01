export default ({ disabled = false, loading = false, title }) => {
    return <button disabled={disabled} type='submit' className='bg-primary-green relative bg-no-repeat shadow-[3px_3px_3px_#098549]  disabled:bg-neutral-400 cursor-pointer text-lg font-semibold mt-5 text-white rounded-full px-3 py-2'>
        <img className=' absolute right-2 top-2' src="/images/ellipse.png" />
        <img className=' absolute left-2 top-2' src="/images/vector.png" />
        <div className="flex items-center justify-center">
            {loading && <div className="animate-spin inline-block mx-2 size-7 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>}
            <span>{title}</span>
        </div>
    </button>
}