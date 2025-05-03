/*
implement function that deletes file fileToRemove.txt
(if there's no file fileToRemove.txt Error with message
FS operation failed must be thrown)
*/

import { fileURLToPath } from "node:url";
import { access, unlink } from "node:fs/promises";
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

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToRemove.txt");

  const [error] = await withError(access(filePath));
  if (error) {
    throw new Error("FS operation failed");
  }

  await unlink(filePath);
};

await remove();
