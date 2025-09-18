import { useRemoveVietnameseTones } from '@/hooks/useRemoveVNTones';
import type { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const subCategory = (state: RootState) => state.subCategory.subCategory;
export const searchSubCategoryByText = (state: RootState) => state.subCategory.searchText;
export const filterSubCateByCategoryId = (state: RootState) => state.subCategory.categoryId;

export const subCategoryFilter = createSelector(
    [subCategory, searchSubCategoryByText, filterSubCateByCategoryId],
    (subCategoryList, searchText, categoryId) => {
        let list: any[] = subCategoryList;

        if (categoryId) {
            list = list.filter((sub) => sub.category === categoryId);
        }

        if (searchText) {
            const query = useRemoveVietnameseTones(searchText);
            list = list.filter((item) => useRemoveVietnameseTones(item.name).includes(query));
        }

        return list;
    }
);
