export const isValidImageSrc = (src: any): boolean => {
    if (typeof src !== 'string') return false;
    return src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://');
};

export const getSafeImageSrc = (src: any, fallback: string = "/assets/placeholder/no-product-image.png"): string => {
    if (isValidImageSrc(src)) return src;
    return fallback;
};

export const getProductLink = (product: any): string => {
    // Handle both SearchProduct and full Product structures
    const cSlug = product.categorySlug || (product.category && product.category.slug) || "products";
    const pSlug = product.slug || product.id || "details";
    
    // Ensure we don't have double slashes if cSlug is empty (though fallback handles it)
    return `/products/${cSlug}/${pSlug}`;
};
