export type Pagination = {
  limit: number;
  offset: number;
};

export type PageBased = {
  startPage: number;
  endPage: number;
  pageSize: number;
  index: number;
};

export const toPageBased = (input: {
  query: Pagination;
  pageSize: number;
}): PageBased => {
  const pageCount = Math.ceil(input.query.limit / input.pageSize);
  const startPage = Math.floor(input.query.offset / input.pageSize) + 1;
  const index = input.query.offset % input.pageSize;
  const endPageOffset = index > 0 ? 1 : 0;
  const endPage = startPage + pageCount - 1 + endPageOffset;
  const pageBased: PageBased = {
    index,
    startPage,
    endPage,
    pageSize: input.pageSize,
  };
  return pageBased;
};
