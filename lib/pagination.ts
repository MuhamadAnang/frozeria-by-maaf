import { TPaginationMeta, TPaginationResponse } from "@/types/meta";

interface IPaginationParams {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

const convertPaginationMeta = (params: IPaginationParams): TPaginationMeta => ({
  page: params.currentPage,
  pageSize: params.pageSize,
  total: params.totalItems,
  totalPage: Math.ceil(params.totalItems / params.pageSize),
});

export const paginationResponseMapper = <T>(
  data: T[],
  meta: Partial<IPaginationParams> = { currentPage: 1, pageSize: 10, totalItems: 0 }
): TPaginationResponse<T> => ({
  data,
  meta: Object.freeze(convertPaginationMeta({
    currentPage: meta.currentPage ?? 1,
    pageSize: meta.pageSize ?? 10,
    totalItems: meta.totalItems ?? 0,
  })),
});

export const calculateOffset = (page: number, pageSize: number): number => {
  return (page - 1) * pageSize;
};