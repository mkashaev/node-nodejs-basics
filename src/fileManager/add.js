// Function should create empty file in cwd
import { writeFile } from "node:fs/promises";

export default async function add([fileName]) {
  await writeFile(fileName, "", { flag: "wx" });
}
