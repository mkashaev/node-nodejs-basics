import cp from "./cp.js";
import { unlink } from "node:fs/promises";

export default async function mv([filePath, newDirPath]) {
  await cp([filePath, newDirPath]);
  await unlink(filePath);
}
