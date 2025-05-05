import { unlink } from "node:fs/promises";

export default async function rm([filePath]) {
  await unlink(filePath);
}
