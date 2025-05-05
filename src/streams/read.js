/*
Implement function that reads file fileToRead.txt content using Readable
Stream and prints it's content into process.stdout
*/
import { fileURLToPath } from "node:url";
import { createReadStream } from "node:fs";
import path from "node:path";
import { stdout } from "node:process";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fileToRead.txt");

  const stream = createReadStream(filePath, { encoding: "utf-8" });

  // stream.on("data", (chunk) => {
  //   stdout.write(chunk + "\n");
  // });

  stream.pipe(stdout);
  stream.on("end", function () {
    stdout.write("\n");
  });
};

await read();
