import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { IAppMultipartBlob, IAppMultipartForm } from "../config/http-request";
import { HttpStatus } from "../config/http-status";

interface IMultipartReduce {
    /** Possible file count */
    files?: number;
    /** Max file size */
    size?: number;
    /** The need for a file check. Default: `true`  */
    fileStrict?: boolean;
}

export function UseMultipart(reduce?: IMultipartReduce) {
    return async (req: FastifyRequest, reply: FastifyReply) => {
        const files: IAppMultipartBlob[] = [];
        const form: IAppMultipartForm = {};
        const strict = reduce?.fileStrict == undefined ? true : !!reduce.fileStrict;
        try {
            const partOption: Record<string, unknown> = {};
            if (reduce?.files != null) partOption["files"] = reduce.files;
            if (reduce?.size != null) partOption["fileSize"] = reduce.size;
            const formDataBody = req.parts({ limits: partOption });
            for await (const f of formDataBody) {
                if (f.type == "file") {
                    files.push({ name: f.filename, mimetype: f.mimetype, buffer: await f.toBuffer() });
                } else {
                    form[f.fieldname] = f.value;
                }
            }
            if (strict && !files.length) return reply.code(HttpStatus.NOT_ACCEPTABLE).send({ message: "No multipart content" });
            req.body = { files, form };
        } catch (ex) {
            const error = ex as FastifyError;
            return reply.code(error.statusCode ?? HttpStatus.I_AM_A_TEAPOT).send({ message: error.message });
        }
    };
}
