
export interface PaginationProps {
  /* 总条数 */
  total: number;
  /* 当前页码 */
  currentPage: number;
  /* 每页条数 */
  pageSize: number;
  /* 每页条数选项 */
  pageSizeOptions?: number[];
  /* 更新当前页码的回调 */
  onUpdateCurrentPage?: (val: number) => void;
  /* 更新每页条数的回调 */
  onUpdatePageSize?: (val: number) => void;
  /* 页码或每页条数改变的回调 */
  onChange?: (page: number, size: number) => void;
}
