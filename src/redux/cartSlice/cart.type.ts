export type InitialStateCartType = {
    status: 'idle' | 'loading' | 'success ' | 'error';
    cart: any[];
    cartUser: any[];
};

export type BodyFetchCart = {
    cartItemId?: string;
    productId?: string;
    quantity?: number;
};
