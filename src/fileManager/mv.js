import { cp } from "./cp";
import { unlink } from "node:fs/promises";

export default async function mv(filePath, newDirPath) {
  const fileUrlPath = new URL(filePath, import.meta.url).pathname;
  const newDirUrlPath = new URL(newDirPath, import.meta.url).pathname;

  await cp(fileUrlPath, `${newDirUrlPath}/${filePath}`);
  await unlink(fileUrlPath);
}
