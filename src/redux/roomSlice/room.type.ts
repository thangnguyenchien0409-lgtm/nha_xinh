export type InitialStateRoomType = {
    status: 'idle' | 'loading' | 'error';
    room: any[];
    searchText: string;
};

export type BodyFetchRoomType = {
    data?: any;
    id?: string;
};
