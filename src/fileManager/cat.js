import { createReadStream } from "node:fs";
import { stdout } from "node:process";

async function cat(filePath) {
  const fileUrlPath = new URL(filePath, import.meta.url).pathname;
  const stream = createReadStream(fileUrlPath, { encoding: "utf-8" });

  stream.pipe(stdout);
  stream.on("end", function () {
    stdout.write("\n");
  });
}

export default cat;
