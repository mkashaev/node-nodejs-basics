import { unlink } from "node:fs/promises";

export default async function rm(filePath) {
  const fileUrlPath = new URL(filePath, import.meta.url).pathname;

  await unlink(fileUrlPath);
}
