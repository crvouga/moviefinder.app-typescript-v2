export type Pagination = {
  limit: number;
  offset: number;
};

export type PageBased = {
  page: number;
  pageSize: number;
  index: number;
};

export const fromPageBased = (pageBased: PageBased): Pagination => ({
  limit: pageBased.pageSize,
  offset: (pageBased.page - 1) * pageBased.pageSize,
});

export const toPageBased = (
  pageSize: number,
  pagination: Pagination,
): PageBased => ({
  pageSize,
  page: Math.floor(pagination.offset / pageSize) + 1,
  index: (pagination.offset % pageSize) + 1,
});

export const fromIndexAndLimit = ({
  index,
  limit,
}: {
  index: number;
  limit: number;
}): Pagination => ({
  limit,
  offset: Math.floor((index - 1) / limit) * limit,
});

export const toIndexWithinPage = (
  pageSize: number,
  pagination: Pagination,
): number => toPageBased(pageSize, pagination).index;
