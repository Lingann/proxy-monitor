import { SortState } from './common-table-types.js';

/**
 * Filters data based on a map of key-value pairs.
 * Performs a case-insensitive substring match.
 */
export function filterData<T>(data: T[], filters: Record<string, string>): T[] {
  if (Object.keys(filters).length === 0) return data;

  return data.filter(row => {
    return Object.keys(filters).every(key => {
      const filterVal = filters[key].toLowerCase();
      // Safe access and conversion to string
      const rowVal = String((row as any)[key] || '').toLowerCase();
      return rowVal.includes(filterVal);
    });
  });
}

/**
 * Sorts data based on a sort key and direction.
 * Handles numbers and strings intelligently.
 */
export function sortData<T>(data: T[], sortState: SortState): T[] {
  if (!sortState.key) return [...data]; // Return copy to avoid mutation if no sort

  const { key, direction } = sortState;
  const sorted = [...data].sort((a, b) => {
    const valA = (a as any)[key];
    const valB = (b as any)[key];

    if (valA === valB) return 0;
    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;

    // Handle numbers
    if (typeof valA === 'number' && typeof valB === 'number') {
      return direction === 'asc' ? valA - valB : valB - valA;
    }

    // Default string comparison
    const strA = String(valA);
    const strB = String(valB);
    return direction === 'asc' 
      ? strA.localeCompare(strB, undefined, { numeric: true }) 
      : strB.localeCompare(strA, undefined, { numeric: true });
  });

  return sorted;
}

/**
 * Paginates data.
 */
export function paginateData<T>(data: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
}
