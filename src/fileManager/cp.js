export default function cp(filePath, newDirPath) {
  const fileUrlPath = new URL(filePath, import.meta.url).pathname;
  const newDirUrlPath = new URL(newDirPath, import.meta.url).pathname;

  return new Promise((resolve, reject) => {
    const readStream = createReadStream(fileUrlPath);
    const writeStream = createWriteStream(`${newDirUrlPath}/${filePath}`);

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
