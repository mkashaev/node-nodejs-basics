/*
implement function that compresses file fileToCompress.txt
to archive.gz using zlib and Streams API
*/
import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

const compress = async () => {
  const inputFilePath = new URL("./files/fileToCompress.txt", import.meta.url);
  const outputFilePath = new URL("./files/archive.gz", import.meta.url);

  const gzip = createGzip();
  const source = createReadStream(inputFilePath);
  const destination = createWriteStream(outputFilePath);

  await pipeline(source, gzip, destination);
  console.log("File compressed successfully");
};

await compress();
