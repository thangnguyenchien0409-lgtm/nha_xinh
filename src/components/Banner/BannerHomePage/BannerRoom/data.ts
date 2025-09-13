import LivingRoom from '@assets/img/room-1.jpg';
import Decoration from '@assets/img/room-2.jpg';
import Bedroom from '@assets/img/room-3.jpg';
import DiningRoom from '@assets/img/room-4.jpg';

export type dataDesType = {
    title: string;
    des: string;
};

export type dataImgType = {
    src: string;
};

export const dataDes: dataDesType[] = [
    {
        title: 'Không gian phòng khách',
        des: 'Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia đình'
    },
    {
        title: 'Đồ trang trí',
        des: 'Mang lại những nguồn cảm hứng và nét sinh động cho không gian'
    },
    {
        title: 'Không gian phòng ngủ',
        des: 'Những mẫu phòng ngủ của Nhà Xinh mang đến cảm giác ấm cúng, gần gũi và thoải mái'
    },
    {
        title: 'Không gian phòng ăn',
        des: 'Một bữa ăn ngon luôn là mong ước của mỗi gia đình. Không gian phòng ăn đóng vai trò rất quan trọng trong văn hóa Việt'
    }
];

export const dataImg: dataImgType[] = [
    {
        src: LivingRoom
    },
    {
        src: Decoration
    },
    {
        src: Bedroom
    },
    {
        src: DiningRoom
    }
];
