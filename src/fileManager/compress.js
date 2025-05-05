import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";
import { pipeline } from "node:stream/promises";

export default async function compress([filePath, destinationPath]) {
  // const inputFilePath = new URL("./files/fileToCompress.txt", import.meta.url);
  // const outputFilePath = new URL("./files/archive.gz", import.meta.url);

  const brotli = createBrotliCompress({
    params: {
      [Symbol.for("brotli.params.quality")]: 11,
    },
  });

  const source = createReadStream(filePath);
  const destination = createWriteStream(destinationPath);

  await pipeline(source, brotli, destination);
  console.log("File compressed successfully");
}
