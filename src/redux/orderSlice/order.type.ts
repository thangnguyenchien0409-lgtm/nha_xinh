export type StripeCheckoutSession = {
    id: string;
    object: string; // "checkout.session"
    payment_status?: string;
    status?: string;
    url?: string;
    [key: string]: any;
};

export type InitialStateOrderType = {
    status: 'idle' | 'loading' | 'success' | 'error';
    order: any[] | null;
    allOrder: any[];
    isStatusOrder: boolean;
    session: StripeCheckoutSession | null;
    loading: boolean;
    searchStatus: string;
};

export type BodyFetchOrderType = {
    cartId?: string;
    data?: any;
    page?: number;
    limit?: number;
    orderId?: string;
    statusOrder?: string;
};
