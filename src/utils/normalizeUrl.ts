export const normalizeUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('/products/')) {
        const parts = url.split('/products/');
        return `http://localhost:3333/api/v1/products/${parts[1]}`;
    }
    return url;
};
