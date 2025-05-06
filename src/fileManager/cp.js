import { resolve } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";

export default function cp([filePath, newDirPath]) {
  const fileLocation = resolve(process.cwd(), filePath);
  const newDirLocation = resolve(process.cwd(), newDirPath);

  console.log({ fileLocation, newDirLocation });

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(fileLocation);
    const writeStream = createWriteStream(`${newDirLocation}/${filePath}`);

    readStream
      .pipe(writeStream)
      .on("finish", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
