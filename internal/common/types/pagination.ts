export interface IPagination {
    limit: number;
    offset: number;
}

export interface IPaginationResponse {
    total: number | Number;
    body: object[];
}

// export interface IPaginationResponse<T> {
//     total: number | Number;
//     body: T[] | object[];
// }
