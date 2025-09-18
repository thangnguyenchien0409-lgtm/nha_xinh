import { useRemoveVietnameseTones } from '@/hooks/useRemoveVNTones';
import type { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const category = (state: RootState) => state.category.category;
export const searchCategoryByText = (state: RootState) => state.category.searchText;

export const categoryFilter = createSelector(
    [category, searchCategoryByText],
    (listCate, searchText) => {
        let list: any[] = listCate;

        if (searchText) {
            const query = useRemoveVietnameseTones(searchText);
            list = list.filter((item) => useRemoveVietnameseTones(item.name).includes(query));
        }

        return list;
    }
);
