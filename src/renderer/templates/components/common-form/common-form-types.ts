export interface FormControl {
    validate(): Promise<boolean | { isValid: boolean; message?: string }>;
    getValue(): any;
    setValue(value: any): void;
    clear?(): void;
    setError?(message: string): void;
    clearError?(): void;
}

export interface FormItemConfig {
    label?: string;
    prop?: string;
    required?: boolean;
}
