export interface IJwt {
    id: string | number;
    session?: any;
    iat?: number;
    exp?: number;
}
