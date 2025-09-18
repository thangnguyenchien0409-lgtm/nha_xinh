import { lazy } from 'react';

const CategoryPage = lazy(() => import('@pages/AdminPage/pages/CategoryPage/CateGoryPage'));
const SubCategoryPage = lazy(
    () => import('@pages/AdminPage/pages/SubCategoryPage/SubCategoryPage')
);
const RoomPage = lazy(() => import('@/pages/AdminPage/pages/RoomPage/RoomPage'));
const Productpage = lazy(() => import('@/pages/AdminPage/pages/ProductPage/ProductPage'));

const routerAdmin = [
    {
        path: '/category',
        element: CategoryPage
    },
    {
        path: '/sub-category',
        element: SubCategoryPage
    },
    {
        path: '/room',
        element: RoomPage
    },
    {
        path: '/product',
        element: Productpage
    }
];

export default routerAdmin;
