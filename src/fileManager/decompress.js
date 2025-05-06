import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";

export default async function decompress([filePath, destinationPath]) {
  const brotli = createBrotliDecompress({
    params: {
      [Symbol.for("brotli.params.quality")]: 11,
    },
  });

  const source = createReadStream(filePath);
  const destination = createWriteStream(destinationPath);

  await pipeline(source, brotli, destination);
  console.log("File decompressed successfully");
}
