function BannerRoomPage({ data }: { data: any }) {
    return (
        <div
            style={{ backgroundImage: `url(${data.src})` }}
            className='relative flex h-[300px] w-full items-end bg-cover bg-center bg-no-repeat sm:h-[400px] md:h-[486px]'
        >
            <div className='text-shadow-b flex w-full flex-col items-center justify-between gap-4 p-[50px] text-white sm:flex-row'>
                <p className='text-[35px] font-semibold text-white md:text-[45px]'>{data.name}</p>
                <p className='text-[18px]'>
                    Trang chủ <span className='opacity-50'>/</span>{' '}
                    <span className='font-semibold'>{data.name}</span>
                </p>
            </div>
        </div>
    );
}

export default BannerRoomPage;
