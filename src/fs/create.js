/*
Implement function that creates new file fresh.txt with content
"I am fresh and young inside of the files folder"
(if file already exists Error with message FS operation failed must be thrown)
*/
import { fileURLToPath } from "node:url";
import { access, writeFile } from "node:fs/promises";
import path from "node:path";

function withError(promise) {
  return promise
    .then((res) => {
      return [undefined, res];
    })
    .catch((err) => {
      return [err, undefined];
    });
}

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", "fresh.txt");

  const [error] = await withError(access(filePath));
  if (!error) {
    throw new Error("FS operation failed");
  }

  await writeFile(filePath, "I am fresh and young", "utf8");
};

await create();
