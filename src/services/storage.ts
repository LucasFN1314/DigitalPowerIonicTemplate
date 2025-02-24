export function clear() {
    localStorage.clear();
}

export function saveObject(key: any, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
}

export function getObject(key: any) {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    return null;
}