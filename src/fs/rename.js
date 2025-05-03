/*
implement function that renames file wrongFilename.txt to properFilename
with extension .md (if there's no file wrongFilename.txt or properFilename.md
already exists Error with message FS operation failed must be thrown)
*/

import { fileURLToPath } from "node:url";
import { access, rename as renameNode } from "node:fs/promises";
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

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const oldFilePath = path.join(__dirname, "files", "wrongFilename.txt");
  const newFilePath = path.join(__dirname, "files", "properFilename.md");

  const [oldFilePathError] = await withError(access(oldFilePath));
  const [newFilePathError] = await withError(access(newFilePath));

  if (oldFilePathError || !newFilePathError) {
    throw new Error("FS operation failed");
  }

  await renameNode(oldFilePath, newFilePath);
};

await rename();
