import { lazy } from 'react';

const UserPage = lazy(() => import('@/pages/UserPage/UserPage.tsx'));
const AdminPage = lazy(() => import('@/pages/AdminPage/AdminPage.tsx'));

const router = [
    {
        path: '/',
        element: UserPage
    },
    {
        path: '/admin',
        element: AdminPage
    }
];

export default router;
