import { sign, verify } from "jsonwebtoken";
import { IJwt } from "../common/types/jwt";

export abstract class JWT {
    static generate(payload: string | object | Buffer): string {
        const expiresIn = process.env.TOKEN_EXPIRE || "7d";
        return sign(payload, process.env.TOKEN_SECRET!, { expiresIn });
    }

    static authenticate(token: string): IJwt {
        return verify(token, process.env.TOKEN_SECRET!) as IJwt;
    }
}
