export class Sector {
    constructor(
        readonly id: string | number,
        readonly name: string,
        readonly area: number
    ) {}

    static alias = "sector";
}
