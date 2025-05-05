import { rename } from "fs/promises";

export default async function rn(filePath, newFileName) {
  const fileUrlPath = new URL(filePath, import.meta.url).pathname;
  const newFileUrlPath = new URL(newFileName, import.meta.url).pathname;

  await rename(fileUrlPath, newFileUrlPath);
}
