import { CiLocationOn } from 'react-icons/ci';
import { CiHeart } from 'react-icons/ci';
import { BsHandbag } from 'react-icons/bs';
import type { IconType } from 'react-icons';

export interface NavItem {
    path: string;
    name: string;
    type: string;
}

export interface IconItem {
    name: IconType;
    type: string;
    size: number;
}

export interface SubNavType {
    path: string;
    type?: string;
    name: string;
}

export const dataNav: NavItem[] = [
    {
        path: '/products-page',
        name: 'Sản phẩm',
        type: 'products'
    },
    {
        path: '/',
        name: 'Phòng',
        type: 'rooms'
    },
    {
        path: '/',
        name: 'Bộ sưu tập',
        type: 'collections'
    },
    {
        path: '/',
        name: 'Về chúng tôi',
        type: 'about'
    },
    {
        path: '/',
        name: 'Góc cảm hứng',
        type: 'inspiration'
    }
];

export const dataIcon: IconItem[] = [
    {
        name: CiLocationOn,
        type: 'location',
        size: 24
    },
    {
        name: CiHeart,
        type: 'wishlist',
        size: 25
    },
    {
        name: BsHandbag,
        type: 'cart',
        size: 21
    }
];

export const dataSubNav: SubNavType[] = [
    {
        path: '/',
        name: 'Phòng khách',
        type: ''
    },
    {
        path: '/',
        name: 'Phòng ăn',
        type: ''
    },
    {
        path: '/',
        name: 'Phòng ngủ',
        type: ''
    },
    {
        path: '/',
        name: 'Phòng làm việc',
        type: ''
    }
];

export const dataSubUser: SubNavType[] = [
    {
        path: '/',
        type: 'info',
        name: 'Thông tin cá nhân'
    },
    {
        path: '/order-detail',
        type: 'order',
        name: 'Đơn hàng'
    },
    {
        path: '/',
        type: 'logout',
        name: 'Đăng xuất'
    }
];
