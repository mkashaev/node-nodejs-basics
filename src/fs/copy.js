/*
implement function that copies folder files files with all its content into folder files_copy at the same level
(if files folder doesn't exist or files_copy has already been created Error with message FS operation failed must be thrown)
*/
import { access, mkdir, copyFile, readdir } from "node:fs/promises";
import path from "node:path";

const copy = async () => {
  const sourceDir = new URL("./files", import.meta.url).pathname;
  const destDir = new URL("./files_copy", import.meta.url).pathname;

  try {
    await access(sourceDir);
    await access(destDir);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await mkdir(destDir);

  const files = await readdir(sourceDir);
  for (const file of files) {
    await copyFile(path.join(sourceDir, file), path.join(destDir, file));
  }
};

await copy();
