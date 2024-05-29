import { DeleteObjectCommand, DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

const Bucket = process.env.S3_BUCKET;
const driver = new S3Client({
    endpoint: String(process.env.S3_API),
    region: process.env.S3_REGION ?? "us-east-1",
    credentials: { accessKeyId: String(process.env.S3_KEY), secretAccessKey: String(process.env.S3_SECRET) },
    forcePathStyle: true
});

export abstract class S3 {
    static async makeGetPresignedUrl(path: string, ttl?: number) {
        if (ttl == undefined && driver.config.forcePathStyle == true) return `${process.env.S3_API}/${Bucket}/${path}`;
        let sign = await getSignedUrl(driver, new GetObjectCommand({ Bucket, Key: path }), { expiresIn: ttl });
        if (!ttl) [sign] = sign.split("?");
        return sign;
    }

    static async makePutPresignedUrl(path: string, ttl?: number) {
        return await getSignedUrl(driver, new PutObjectCommand({ Bucket, Key: path }), { expiresIn: ttl });
    }

    static async uploadFile(path: string, blob: Buffer | Readable, mimetype?: string, metaData?: Record<string, string>) {
        const cmd = new PutObjectCommand({ Bucket, Key: path, Body: blob, ContentType: mimetype, Metadata: metaData });
        return await driver.send(cmd);
    }

    static async removeObjectOne(path: string): Promise<void> {
        const cmd = new DeleteObjectCommand({ Bucket, Key: path });
        await driver.send(cmd);
    }

    static async removeObjectMany(paths: string[]): Promise<void> {
        const objectsToDelete = paths.map((path) => ({ Key: path }));
        const cmd = new DeleteObjectsCommand({ Bucket, Delete: { Objects: objectsToDelete } });
        await driver.send(cmd);
    }

    static async removeDir(path: string): Promise<void> {
        const cmd = new ListObjectsV2Command({ Bucket, Prefix: path });
        let truncate = true;
        while (truncate) {
            const { Contents, IsTruncated, NextContinuationToken } = await driver.send(cmd);
            if (Contents?.length) S3.removeObjectMany(Contents.map((i) => String(i.Key))).catch((ex) => console.error(ex));
            truncate = !!IsTruncated;
            cmd.input.ContinuationToken = NextContinuationToken;
        }
    }
}
