/*
implement function that calculates SHA256 hash for file fileToCalculateHashFor.txt
and logs it into console as hex using Streams API
*/
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { access } from "node:fs/promises";
import path from "node:path";
import { createReadStream } from "node:fs";

function withError(promise) {
  return promise.then((data) => [null, data]).catch((error) => [error]);
}

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");

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
};

await calculateHash();
