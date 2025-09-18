export type InitialStateCategoryType = {
    status: 'idle' | 'loading' | 'error';
    category: any[];
    currentPage: number;
    numberPage: number;
    limit: number;
    total: number;
    searchText: string;
    loading: boolean;
};

export type BodyFetchCategoryType = {
    page?: number;
    limit?: number;
    data?: any;
    id?: string;
};
