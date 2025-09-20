import type { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const allOrder = (state: RootState) => state.order.allOrder;
export const searchOrderByStatus = (state: RootState) => state.order.searchStatus;

export const orderFilter = createSelector(
    [allOrder, searchOrderByStatus],
    (listOrder, searchStatus) => {
        if (!searchStatus || searchStatus === 'all') {
            return {
                ...listOrder,
                orders: listOrder.orders
            };
        }

        return {
            ...listOrder,
            orders: listOrder.orders.filter((item: any) => item.status === searchStatus)
        };
    }
);
