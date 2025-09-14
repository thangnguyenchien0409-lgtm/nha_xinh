import type { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const productList = (state: RootState) => state.product.product;
export const productListNoLimit = (state: RootState) => state.product.productNoLimit;
export const searchSelectProduct = (state: RootState) => state.product.filterSelectProduct;
export const searchProductByMaterial = (state: RootState) => state.product.filterMaterial;
export const searchProductByText = (state: RootState) => state.product.searchText;

export const getProductFilter = createSelector(
    [productList, searchSelectProduct, searchProductByMaterial],
    (productList, filterSelectProduct, filterMaterialProduct) => {
        let list = [...(productList || [])];

        if (filterSelectProduct) {
            if (filterSelectProduct === 'new') {
                list = list
                    .sort(
                        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                    )
                    .slice(0, 10);
            } else if (filterSelectProduct === 'asc') {
                list = list.sort((a, b) => a.price - b.price);
            } else {
                list = list.sort((a, b) => b.price - a.price);
            }
        }
        if (filterMaterialProduct) {
            if (filterMaterialProduct === 'stone') {
                list = list.filter((item) => item.material.toLowerCase().includes('đá'));
            } else if (filterMaterialProduct === 'wood') {
                list = list.filter((item) => item.material.toLowerCase().includes('gỗ'));
            } else if (filterMaterialProduct === 'metal') {
                const metals: string[] = ['sắt', 'nhôm', 'kim loại', 'đồng', 'inox'];
                list = list.filter((item) =>
                    metals.some((m) => item.material.toLowerCase().includes(m))
                );
            } else {
                list = list.filter((item) => item.material.toLowerCase().includes('gốm'));
            }
        }
        return list;
    }
);

export const getProductSearch = createSelector(
    [productListNoLimit, searchProductByText],
    (productList, searchText) => {
        let list: any[] = productList;

        function removeVietnameseTones(str: string) {
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd')
                .replace(/Đ/g, 'D');
        }
        if (searchText) {
            const text = searchText.toLowerCase();
            const textNoAccent = removeVietnameseTones(text);
            list = list.filter((item: any) => {
                const title = item.title.toLowerCase();
                const titleNoAccent = removeVietnameseTones(title);

                return title.includes(text) || titleNoAccent.includes(textNoAccent);
            });
        }
        return list;
    }
);
