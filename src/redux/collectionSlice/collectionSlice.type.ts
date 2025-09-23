export type InitialStateCollectionType = {
    status: 'idle' | 'loading' | 'error';
    collection: any[];
    collectionById: any[];
};
