export type InitialStateCategoryType = {
    status: 'idle' | 'loading' | 'error';
    category: any[];
    currentPage: number;
    numberPage: number;
    limit: number;
    total: number;
};

export type BodyFetchCategoryType = {
    page?: number;
    limit?: number;
};
