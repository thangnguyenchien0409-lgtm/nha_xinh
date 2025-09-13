import { lazy } from 'react';

const HomePage = lazy(() => import('@pages/UserPage/page/HomePage/HomePage'));

const routerUser = [
    {
        path: '/',
        element: HomePage
    }
];

export default routerUser;
