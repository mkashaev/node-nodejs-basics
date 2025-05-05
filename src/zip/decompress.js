/*
 implement function that decompresses archive.gz back to the fileToCompress.txt
 with same content as before compression using zlib and Streams API
*/
import { createReadStream, createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

const decompress = async () => {
  const inputFilePath = new URL("./files/archive.gz", import.meta.url);
  const outputFilePath = new URL("./files/fileToCompress.txt", import.meta.url);

  const gunzip = createGunzip();
  const source = createReadStream(inputFilePath);
  const destination = createWriteStream(outputFilePath);

  await pipeline(source, gunzip, destination);
  console.log("File decompressed successfully");
};

await decompress();
