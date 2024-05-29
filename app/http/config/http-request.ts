export interface IAppMultipartBlob {
    name: string;
    mimetype: string;
    buffer: Buffer;
}

export type IAppMultipartForm = Record<string, unknown>;

export interface IAppMultipart {
    files: IAppMultipartBlob[];
    form: IAppMultipartForm;
}
