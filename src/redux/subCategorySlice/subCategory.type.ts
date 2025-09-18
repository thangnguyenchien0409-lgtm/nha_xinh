export type InitialStateSubCateType = {
    status: 'idle' | 'loading' | 'error';
    subCategory: any[];
    searchText: string;
    categoryId: string;
    loading: boolean;
    initialized: boolean;
};

export type BodyFetchSubCategoryType = {
    data?: any;
    id?: string;
};
