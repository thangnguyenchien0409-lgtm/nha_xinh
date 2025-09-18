export type InitialStateType = {
    status: 'idle' | 'loading' | 'success' | 'error';
    product: any[];
    productNoLimit: any[];
    productById: any;
    page: number;
    totalPage: number;
    newProduct: any[];
    viewedProduct: any[];
    filterSelectProduct: string | null;
    filterMaterial: string | null;
    searchText: string;
    categoryId: string;
    subCategoryId: string;
    roomId: string;
    loading: boolean;
};

export type ApiResponse = {
    Document: any[];
    paginationResult: {
        numberOfPages: number;
    };
};

export type FetchParam = {
    page?: number | undefined;
    limit?: number | undefined;
    data?: any;
    id?: string;
};
