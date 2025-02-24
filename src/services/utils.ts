export function limit(text: any, length: any) {
    if (text?.length > length) {
        return text.substring(0, length) + "...";
    }
    return text;
}

export const chunkArray = (array: any, chunkSize: any) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

export function defaultImageProduct(e: any) {
    e.target.src = "https://files.digitalpower.ar/download/papelera.db/default-product.png";
}