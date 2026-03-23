export const isValidImageSrc = (src: any): boolean => {
    if (typeof src !== 'string') return false;
    return src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://');
};

export const getSafeImageSrc = (src: any, fallback: string = "/images/Besmak-Logo.png"): string => {
    if (isValidImageSrc(src)) return src;
    return fallback;
};
