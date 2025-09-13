import Sofa from '@assets/img/sofa.jpg';
import Table from '@assets/img/ban-an.jpg';
import Bed from '@assets/img/giuong.jpg';
import Armchair from '@assets/img/armchair.jpg';
import Chair from '@assets/img/ghe-an.jpg';
import BannerCategoryItem from '@/components/Banner/BannerHomePage/BannerCategory/BannerCategoryItem';

function BannerCategory() {
    return (
        <div className='mt-[30px] grid cursor-pointer grid-cols-1 gap-[20px] md:grid-cols-2'>
            <div className='h-[400px] w-full md:h-[580px]'>
                <BannerCategoryItem url={Sofa} text={'Sofa'} />
            </div>
            <div className='grid w-full grid-cols-1 gap-[20px] md:grid-cols-2'>
                <div className='h-[290px] w-full md:h-full'>
                    <BannerCategoryItem url={Table} text={'Bàn ăn'} />
                </div>
                <div className='h-[290px] w-full md:h-full'>
                    <BannerCategoryItem url={Bed} text={'Giường'} />
                </div>
                <div className='h-[290px] w-full md:h-full'>
                    <BannerCategoryItem url={Armchair} text={'Armchair'} />
                </div>
                <div className='h-[290px] w-full md:h-full'>
                    <BannerCategoryItem url={Chair} text={'Ghế ăn'} />
                </div>
            </div>
        </div>
    );
}

export default BannerCategory;
