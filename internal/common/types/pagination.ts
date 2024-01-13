export interface IPagination {
    limit: number;
    offset: number;
}

export interface IPaginationResponse {
    total: number | Number;
    body: object[];
}
