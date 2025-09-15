import { lazy } from 'react';

const HomePage = lazy(() => import('@pages/UserPage/page/HomePage/HomePage'));
const ProductPage = lazy(() => import('@pages/UserPage/page/ProductPage/ProductPage'));
const ProductDetailpage = lazy(
    () => import('@pages/UserPage/page/ProductDetailPage/ProductDetailPage')
);
const CartPage = lazy(() => import('@pages/UserPage/page/CartPage/CartPage'));
const OrderPage = lazy(() => import('@pages/UserPage/page/OrderPage/OrderPage'));
const OrderSuccessStripe = lazy(() => import('@pages/UserPage/page/OrderPage/OrderSuccessStripe'));
const OrderDetailPage = lazy(() => import('@pages/UserPage/page/OrderDetailPage/OrderDetailPage'));

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
    },
    {
        path: '/order',
        element: OrderPage
    },
    {
        path: '/order-success-stripe',
        element: OrderSuccessStripe
    },
    {
        path: '/order-detail',
        element: OrderDetailPage
    }
];

export default routerUser;
