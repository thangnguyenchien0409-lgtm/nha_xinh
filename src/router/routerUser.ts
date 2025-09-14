import { lazy } from 'react';

const HomePage = lazy(() => import('@pages/UserPage/page/HomePage/HomePage'));
const ProductPage = lazy(() => import('@pages/UserPage/page/ProductPage/ProductPage'));
const ProductDetailpage = lazy(
    () => import('@pages/UserPage/page/ProductDetailPage/ProductDetailPage')
);
const CartPage = lazy(() => import('@pages/UserPage/page/CartPage/CartPage'));

const routerUser = [
    {
        path: '/',
        element: HomePage
    },
    {
        path: '/products-page',
        element: ProductPage
    },
    {
        path: '/:slug/:id',
        element: ProductDetailpage
    },
    {
        path: '/cart-page',
        element: CartPage
    }
];

export default routerUser;
