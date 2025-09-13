import { dataInspire, dataNews, dataNhaXinh } from '@/components/Footer/data';
import FooterItem from '@/components/Footer/FooterItem';
import FooterSlide from '@/components/Footer/FooterSilde';

import Img from '@assets/img/logo-footer.png';

function Footer() {
    return (
        <div className='font-roboto w-full bg-[#303036] px-4 text-white lg:px-0'>
            <div className='mt-0 xl:px-0'>
                <div className='mx-auto w-full md:w-3xl lg:w-7xl'>
                    <div className='grid grid-cols-2 gap-7 py-10 md:grid-cols-4'>
                        <div className='w-full text-white'>
                            <p className='text-[18px] font-semibold uppercase'>
                                Kết nối với nhà xinh
                            </p>
                            <img src={Img} alt='' className='my-6' />
                            <div className='flex flex-col gap-4 text-sm font-normal'>
                                <p className='text-[16px]'>Follow us</p>
                                <p>Instagram-Youtube-Facebook</p>
                                <div className='hover:text-text-des w-full cursor-pointer border border-solid border-white py-2 text-center transition-all hover:bg-white sm:w-[50%] md:w-full lg:w-[55%] lg:px-5'>
                                    Hệ thống cửa hàng
                                </div>
                            </div>
                        </div>
                        <FooterItem title={'Nhà Xinh'} data={dataNhaXinh} />
                        <FooterItem title={'CẢM HỨNG #NHAXINH'} data={dataInspire} />
                        <FooterItem title={'Newsletter'} data={dataNews} />
                    </div>

                    <FooterSlide />
                    <div className='py-7 text-sm text-[#ffffff80]'>
                        <p className='mb-2'>
                            © 2021 - Bản quyền của Nhà Xinh - thương hiệu thuộc AKA Furniture
                        </p>
                        <p>Từ năm 1999 - thương hiệu đăng ký số 284074 Cục sở hữu trí tuệ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
