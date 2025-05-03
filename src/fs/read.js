/*
implement function that prints content of the fileToRead.txt into console
(if there's no file fileToRead.txt Error with message
FS operation failed must be thrown)
*/
import { fileURLToPath } from "node:url";
import { access, readFile } from "node:fs/promises";
import path from "node:path";

function withError(promise) {
  return promise
    .then((res) => {
      return [undefined, res];
    })
    .catch((err) => {
      return [err, undefined];
    });
}

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToRead.txt");

  const [error] = await withError(access(filePath));
  if (error) {
    throw new Error("FS operation failed");
  }

  const [readError, data] = await withError(readFile(filePath, "utf8"));
  if (readError) {
    throw new Error("FS operation failed");
  }

  console.log(data);
};

await read();
