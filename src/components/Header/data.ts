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
        path: '/room',
        name: 'Phòng',
        type: 'rooms'
    },
    {
        path: '/collection-page',
        name: 'Bộ sưu tập',
        type: 'collections'
    },
    {
        path: '/about-page',
        name: 'Về chúng tôi',
        type: 'about'
    },
    {
        path: '/inspire-page',
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
        path: '/room',
        name: 'Phòng khách',
        type: 'livingRoom'
    },
    {
        path: '/room',
        name: 'Phòng ăn',
        type: 'diningRoom'
    },
    {
        path: '/room',
        name: 'Phòng ngủ',
        type: 'bedRoom'
    },
    {
        path: '/room',
        name: 'Phòng làm việc',
        type: 'officeRoom'
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
