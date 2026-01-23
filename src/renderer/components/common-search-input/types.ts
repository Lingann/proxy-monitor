import { Component, VNode } from 'vue';

export interface SearchInputOption {
  label: string;
  value: string | number;
  [key: string]: any;
}

export interface SearchInputConfig {
  options?: SearchInputOption[];
  width?: string | number;
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  enableDropdown?: boolean;
  maxItems?: number;
  searchKeys?: string[];
  fuseOptions?: any;
  prefixIcon?: Component | VNode;
  zIndex?: number;
  /* Legacy callbacks support in config */
  onSearch?: (query: string) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (value: string | number | null, option?: SearchInputOption) => void;
}

export interface CommonSearchInputProps {
  modelValue: string | number | null;
  config?: SearchInputConfig;
  /* Event Props */
  onUpdateModelValue?: (val: string | number | null) => void;
  onChange?: (value: string | number | null, option?: SearchInputOption) => void;
  onSearch?: (query: string) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}
