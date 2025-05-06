import { writeFile } from "node:fs/promises";

export default async function add([fileName]) {
  await writeFile(fileName, "", { flag: "wx" });
}
