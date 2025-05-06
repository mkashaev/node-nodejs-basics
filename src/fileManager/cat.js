import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import { resolve } from "node:path";

async function cat([filePath]) {
  const absolutePath = resolve(process.cwd(), filePath);

  return new Promise((resolve, reject) => {
    const stream = createReadStream(absolutePath, { encoding: "utf-8" });

    stream.on("error", (error) => {
      reject(new Error(`Cannot read file: ${error.message}`));
    });

    stream.pipe(stdout);

    stream.on("end", () => {
      resolve();
    });
  });
}

export default cat;
