import BannerLocation from '@/components/Banner/BannerLocation/BannerLocation';
import Footer from '@/components/Footer/Footer';
import MainLayout from '@/components/Layout/MainLayout';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import InspireItemPage from '@/pages/UserPage/page/InspireDetailPage/InspireItemPage';
import { fetchGetInspireById } from '@/redux/inSpireSlice/inSpireSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function InspireDetailPage() {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const inspireById = useAppSelector((state) => state.inspire.inspireById);

    console.log(inspireById);

    useEffect(() => {
        dispatch(fetchGetInspireById(id!));
    }, [dispatch]);

    return (
        <div className='mt-[90px]'>
            <MainLayout>
                <div className='flex flex-col gap-10'>
                    <div className='h-[260px] w-full md:h-[400px] lg:h-[600px]'>
                        <img
                            src={inspireById.image}
                            alt=''
                            className='h-full w-full object-cover object-center'
                        />
                    </div>
                    <div>
                        <p className='font-monterrat text-center text-[25px] font-semibold uppercase md:text-[30px] lg:text-[37px]'>
                            {inspireById.title}
                        </p>
                        <p className='text-text-des my-5 text-center text-[18px] leading-7 font-normal md:text-[20px] lg:text-[23px] lg:leading-9'>
                            {inspireById.description}
                        </p>
                    </div>

                    <InspireItemPage data={inspireById?.subInspire?.slice(0, 1)} reverse={false} />
                    <InspireItemPage data={inspireById?.subInspire?.slice(1, 2)} reverse={true} />
                    <InspireItemPage
                        data={inspireById?.subInspire?.slice(2, inspireById?.subInspire.length)}
                        reverse={false}
                    />
                </div>
            </MainLayout>
            <BannerLocation />
            <Footer />
        </div>
    );
}

export default InspireDetailPage;
