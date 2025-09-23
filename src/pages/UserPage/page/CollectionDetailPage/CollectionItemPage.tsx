function CollectionItemPage({ data, reverse = false }: { data: any; reverse?: boolean }) {
    return (
        <div className='mt-10 mb-10'>
            {data?.map((item: any) => (
                <div
                    key={item.id}
                    className={`flex flex-col items-center justify-center gap-4 md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}
                >
                    <div className='flex w-full flex-col gap-4 md:w-[50%] md:pr-10 lg:w-[60%]'>
                        <p className='font-monterrat text-[28px] font-semibold'>{item?.title}</p>
                        <p className='text-text-des font-roboto text-[16px] leading-7 md:text-[18px]'>
                            {item?.description}
                        </p>
                    </div>
                    <div className='flex min-h-[300px] flex-1 items-center justify-center gap-4'>
                        {item?.images.map((img: any) => (
                            <div key={img.id} className='h-full w-full'>
                                <img className='h-full w-full object-cover' src={img.src} alt='' />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CollectionItemPage;
