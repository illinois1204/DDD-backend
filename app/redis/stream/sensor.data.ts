export async function saveData(req: string): Promise<void> {
    console.log("request from redis stream -> data:");
    console.log(req);
}
