import { lazy } from 'react';

const CategoryPage = lazy(() => import('@pages/AdminPage/pages/CategoryPage/CateGoryPage'));
const SubCategoryPage = lazy(
    () => import('@pages/AdminPage/pages/SubCategoryPage/SubCategoryPage')
);
const RoomPage = lazy(() => import('@/pages/AdminPage/pages/RoomPage/RoomPage'));

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
    }
];

export default routerAdmin;
