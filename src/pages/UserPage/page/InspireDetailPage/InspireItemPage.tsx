function InspireItemPage({ data, reverse = false }: { data: any; reverse: boolean }) {
    return (
        <div>
            {data?.map((item: any) => (
                <div
                    key={item.id}
                    className={`mb-10 flex flex-col gap-5 md:flex-row md:gap-10 ${reverse ? 'md:flex-row-reverse' : ''}`}
                >
                    <div className='h-[250px] w-full md:h-[439px] md:w-[50%]'>
                        {item?.images.map((img: any) => (
                            <img
                                key={img.id}
                                src={img.src}
                                alt=''
                                className='h-full w-full object-cover object-center'
                            />
                        ))}
                    </div>

                    <div className='flex-1 px-4'>
                        <p className='font-monterrat text-start text-[24px] leading-7 font-semibold md:text-[30px] md:leading-9 lg:text-[35px] lg:leading-12'>
                            {item.title}
                        </p>
                        <p className='text-text-des my-5 text-start text-[18px] leading-7 font-normal md:text-[20px] lg:text-[23px] lg:leading-9'>
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InspireItemPage;
