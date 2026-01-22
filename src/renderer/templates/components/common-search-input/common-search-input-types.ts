export interface SearchInputOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any; // Allow extra props for custom rendering or data
}

export interface FuseOptions {
  keys?: string[];
  threshold?: number;
  distance?: number;
  minMatchCharLength?: number;
  [key: string]: any;
}

export interface SearchInputConfig {
  options?: SearchInputOption[];
  placeholder?: string;
  width?: string; // CSS width
  height?: string; // CSS height
  size?: 'small' | 'medium' | 'large'; // Default: 'medium'
  maxItems?: number; // Max items to show in dropdown
  defaultValue?: string | number;
  disabled?: boolean;
  zIndex?: number;
  
  // Search specific
  enableDropdown?: boolean; // Whether to show dropdown with search results
  fuseOptions?: FuseOptions; // Options for Fuse.js
  searchKeys?: string[]; // Keys to search in options (default: ['label'])
  
  // Icons
  prefixIcon?: string; // HTML string or specific icon name (if using feather)
  clearable?: boolean; // Default: true
  
  // Callbacks
  onChange?: (value: string | number | null, option?: SearchInputOption) => void;
  onSearch?: (query: string) => void; // Called when search query changes
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}

export interface SearchInputState {
  isOpen: boolean;
  selectedValue: string | number | null;
  query: string;
  activeOptionIndex: number; // For keyboard navigation
  filteredOptions: SearchInputOption[];
}
