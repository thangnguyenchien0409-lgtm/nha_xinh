import { lazy } from 'react';

const CategoryPage = lazy(() => import('@pages/AdminPage/pages/CategoryPage/CateGoryPage'));

const routerAdmin = [
    {
        path: '/category',
        element: CategoryPage
    }
];

export default routerAdmin;
