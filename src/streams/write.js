/*
implement function that writes process.stdin data into file fileToWrite.txt
content using Writable Stream
*/

import { createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { stdin } from "node:process";

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToWrite.txt");

  const stream = createWriteStream(filePath);

  stdin.pipe(stream);
};

await write();
