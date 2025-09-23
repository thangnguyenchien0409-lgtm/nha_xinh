import { FiCompass } from 'react-icons/fi';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { TfiCup } from 'react-icons/tfi';
import { FaRegUserCircle } from 'react-icons/fa';

// Admin Icon
import { MdDashboard } from 'react-icons/md';
import { MdOutlineCategory } from 'react-icons/md';
import { FaCartShopping } from 'react-icons/fa6';
import { IoMdBasket } from 'react-icons/io';
import { HiUsers } from 'react-icons/hi';

export const dataNavAdmin = [
    {
        path: 'dash-board',
        name: 'Dash Board',
        icons: FiCompass
    },
    {
        path: 'category-admin',
        name: 'Danh mục',
        icons: BiCategoryAlt,
        subNav: [
            {
                path: 'sub-category-admin',
                name: 'Danh mục phụ'
            },
            {
                path: 'room',
                name: 'Phòng'
            }
        ]
    },
    {
        path: 'products',
        name: 'Sản phẩm',
        icons: IoPaperPlaneOutline,
        subNav: [
            {
                path: 'coupon',
                name: 'Mã giảm giá'
            },
            {
                path: 'reviews',
                name: 'Đánh giá'
            }
        ]
    },

    {
        path: 'order-admin',
        name: 'Đơn hàng',
        icons: TfiCup
    },
    {
        path: 'user',
        name: 'Người dùng',
        icons: FaRegUserCircle
    }
];

export const dataSideBar = [
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

export const dataSideBarAdmin = [
    {
        path: '/admin',
        icon: MdDashboard,
        name: 'Dashboard',
        type: 'dashboard'
    },
    {
        path: '/category',
        icon: MdOutlineCategory,
        name: 'Danh mục',
        type: 'category',
        subs: [
            {
                path: '/sub-category',
                name: 'Danh mục phụ',
                type: 'subCategory'
            },
            {
                path: '/room',
                name: 'Phòng',
                type: 'room'
            }
        ]
    },
    {
        path: '/product',
        icon: FaCartShopping,
        name: 'Sản phẩm',
        type: 'product'
    },
    {
        path: '/order',
        icon: IoMdBasket,
        name: 'Đơn hàng',
        type: 'product'
    },
    {
        path: '/user',
        icon: HiUsers,
        name: 'User',
        type: 'user'
    }
];

export const dataRoom = [
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
