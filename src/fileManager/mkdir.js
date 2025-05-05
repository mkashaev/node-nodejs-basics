import { mkdir } from "node:fs/promises";

export default async function mkdir(dirName) {
  await mkdir(dirName, { recursive: true });
}
