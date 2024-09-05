import { PaginateInfo } from './pagination.interface';

export class Pagination<T> {
  pagination: PaginateInfo;

  data: Array<T>;

  metadata?: any;

  constructor(limit: number, totalCount: number, page: number, data: Array<T>) {
    this.data = data;
    this.pagination = this.__generatePagination(limit, totalCount, page);
  }

  private __generatePagination(
    limit: number,
    totalCount: number,
    page: number,
  ): PaginateInfo {
    const totalPages = Math.ceil(totalCount / limit);
    return {
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      pageSize: limit,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };
  }
}
