export type Paginated<T> = {
  limit: number;
  offset: number;
  total: number;
  page: T[];
};
