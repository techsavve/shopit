export type IPaginatedRequest = {
    limit: number,
    page: number
}

export type IPaginateResponse<Response> = {
    total: number;
    list: Response[];
    has_next: boolean;
  }