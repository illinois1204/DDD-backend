export interface IPagination {
    limit: number;
    offset: number;
}

export interface IPaginationResponse<T> {
    total: number | Number;
    body: T[];
}
