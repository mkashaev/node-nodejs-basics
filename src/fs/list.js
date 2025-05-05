/*
implement function that prints array of all filenames from files
folder into console (if files folder doesn't exists Error with message
FS operation failed must be thrown)
*/

import { fileURLToPath } from "node:url";
import { access, readdir } from "node:fs/promises";
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

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const dirPath = path.join(__dirname, "files");

  const [error] = await withError(access(dirPath));
  if (error) {
    throw new Error("FS operation failed");
  }

  const files = await readdir(dirPath);

  console.log(files.join("\n"));
};

await list();
