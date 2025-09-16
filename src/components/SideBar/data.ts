import { FiCompass } from 'react-icons/fi';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { TfiCup } from 'react-icons/tfi';
import { FaRegUserCircle } from 'react-icons/fa';

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
        path: '/',
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
