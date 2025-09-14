import LivingRoom from '@assets/img/room-5.jpeg';
import Decoration from '@assets/img/room-6.jpg';
import Bedroom from '@assets/img/room-7.jpg';
import DiningRoom from '@assets/img/room-8.jpeg';

export type DataProductPageType = {
    type: string;
    name: string;
};

export const dataSelectProduct: DataProductPageType[] = [
    {
        type: 'new',
        name: 'Mới nhất'
    },
    {
        type: 'asc',
        name: 'Theo giá: Thấp đến cao'
    },
    {
        type: 'desc',
        name: 'Theo giá: Cao đến thấp'
    }
];

export const dataMaterial: DataProductPageType[] = [
    {
        type: 'stone',
        name: 'Đá'
    },
    {
        type: 'wood',
        name: 'Gỗ'
    },
    {
        type: 'ceramic',
        name: 'Gốm'
    },
    {
        type: 'metal',
        name: 'Kim loại '
    }
];

export const dataImgProduct: any[] = [
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
