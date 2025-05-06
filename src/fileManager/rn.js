import { rename } from "fs/promises";

export default async function rn([filePath, newFileName]) {
  await rename(filePath, newFileName);
}
