export type Pagination = {
  limit: number;
  offset: number;
};

export type PageBased = {
  page: number;
  pageSize: number;
  index: number;
};

export const fromPageBased = (pageBased: PageBased): Pagination => {
  return {
    limit: pageBased.pageSize,
    offset: (pageBased.page - 1) * pageBased.pageSize,
  };
};

export const toPageBased = (input: {
  pageSize: number;
  pagination: Pagination;
}): PageBased => {
  return {
    pageSize: input.pageSize,
    page: Math.floor(input.pagination.offset / input.pageSize) + 1,
    index: (input.pagination.offset % input.pageSize) + 1,
  };
};

export const fromIndexAndLimit = ({
  index,
  limit,
}: {
  index: number;
  limit: number;
}): Pagination => {
  return {
    limit,
    offset: Math.floor((index - 1) / limit) * limit,
  };
};

export const toIndexWithinPage = (input: {
  pageSize: number;
  pagination: Pagination;
}): number => {
  return toPageBased(input).index;
};
