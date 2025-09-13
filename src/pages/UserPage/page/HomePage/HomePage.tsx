import BannerHomePage from '@/components/Banner/BannerHomePage/BannerHomePage';
import InspireHomePage from '@/components/Inspire/InspireHomePage';
import ProductHomePage from '@/components/Product/ProductHomePage';
import AboutImg from '@assets/img/noi-that.jpg';

function HomePage() {
    return (
        <div className='w-full'>
            <BannerHomePage />
            <div className='w-full gap-5 py-10 sm:flex lg:py-6 xl:py-0'>
                <div className='mb-[40px] flex w-full flex-col items-center justify-center text-center sm:w-[50%]'>
                    <h2 className='text-text-des mb-[14px] text-[20px] font-semibold sm:text-[28px]'>
                        NỘI THẤT TINH TẾ
                    </h2>
                    <p className='mb-[14px] w-full px-2 text-[16px] leading-7 sm:w-[300px] sm:px-0 sm:text-[18px] lg:w-[370px]'>
                        Với kinh nghiệm hơn 25 năm trong hoàn thiện nội thất, Nhà Xinh mang đến giải
                        pháp toàn diện trong bao gồm thiết kế, trang trí và cung cấp nội thất trọn
                        gói. Sở hữu đội ngũ chuyên nghiệp và hệ thống 7 cửa hàng, Nhà Xinh là lựa
                        chọn cho không gian tinh tế và hiện đại.
                    </p>
                    <button className='flex cursor-pointer items-center justify-center border-[2px] border-solid border-[#7A9C59] px-5 py-3 font-bold text-[#7A9C59] transition-all hover:bg-[#7A9C59] hover:text-white'>
                        Xem thêm
                    </button>
                </div>
                <div className='w-full sm:w-[50%]'>
                    <img
                        className='h-[245px] w-full object-cover lg:h-[350px] xl:h-[500px]'
                        src={AboutImg}
                        alt=''
                    />
                </div>
            </div>
            <ProductHomePage />
            <InspireHomePage />
        </div>
    );
}

export default HomePage;
