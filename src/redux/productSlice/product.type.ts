export type InitialStateType = {
    status: 'idle' | 'loading' | 'success' | 'error';
    product: any[];
    totalPage: number;
    newProduct: any[];
    viewedProduct: any[];
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
};
