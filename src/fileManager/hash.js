import { createHash } from "node:crypto";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { createReadStream } from "node:fs";

function withError(promise) {
  return promise.then((data) => [null, data]).catch((error) => [error]);
}

export default async function calcHash([fPath]) {
  const filePath = resolve(process.cwd(), fPath);

  const [error] = await withError(access(filePath));
  if (error) {
    throw new Error("FS operation failed");
  }

  const hash = createHash("sha256");
  const stream = createReadStream(filePath);

  stream.on("data", (chunk) => {
    hash.update(chunk);
  });

  stream.on("end", () => {
    console.log(hash.digest("hex"));
  });
}
