import { mkdir as nodeMdir } from "node:fs/promises";

export default async function mkdir([dirName]) {
  await nodeMdir(dirName, { recursive: true });
}
