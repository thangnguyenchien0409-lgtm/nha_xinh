export type InitialStateReviewType = {
    status: 'idle' | 'loading' | 'success' | 'error';
    review: any;
};

export type FetchParam = {
    productId?: string;
    data: any;
    orderId?: string;
};
