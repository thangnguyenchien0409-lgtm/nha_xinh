import BannerRoomItem from '@/components/Banner/BannerHomePage/BannerRoom/BannerRoomItem';
import { dataDes, type dataImgType } from '@/components/Banner/BannerHomePage/BannerRoom/data';

function BannerRoom({ data, isBgWhite = false }: { data: dataImgType[]; isBgWhite: boolean }) {
    return (
        <div
            className={`mt-[20px] w-full px-4 md:pt-5 lg:py-[70px] xl:relative xl:h-[1190px] ${
                isBgWhite ? 'bg-white' : 'bg-[#ebebeb]'
            }`}
        >
            <BannerRoomItem
                src={data[0].src}
                wImg={'750px'}
                hImg={'500px'}
                title={dataDes[0].title}
                des={dataDes[0].des}
                topDes='0'
                rightDes='-300px'
            />

            <BannerRoomItem
                src={data[1].src}
                wImg={'420px'}
                hImg={'415px'}
                title={dataDes[1].title}
                des={dataDes[1].des}
                topDes='60%'
                rightDes='440px'
                right='0'
                reverse={true}
            />

            <BannerRoomItem
                src={data[2].src}
                wImg={'410px'}
                hImg={'326px'}
                title={dataDes[2].title}
                des={dataDes[2].des}
                topDes='0'
                rightDes='-300px'
                bottom='18%'
                left={'100px'}
            />

            <BannerRoomItem
                src={data[3].src}
                wImg={'546px'}
                hImg={'352px'}
                title={dataDes[3].title}
                des={dataDes[3].des}
                topDes='100%'
                bottom='23%'
                right='100px'
                reverse={true}
            />
        </div>
    );
}

export default BannerRoom;
