export function t(key: string, replacements: Record<string, any> = {}): string {
    const translations = (window as any).translations || {};
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
        if (value === undefined || value === null) break;
        value = value[k];
    }
    
    if (typeof value === 'string') {
        let result = value;
        for (const [k, v] of Object.entries(replacements)) {
            result = result.replace(`{${k}}`, String(v));
        }
        return result;
    }
    return key;
}
