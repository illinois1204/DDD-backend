export interface IJwt {
    id: string;
    session?: string;
    iat?: number;
    exp?: number;
}
