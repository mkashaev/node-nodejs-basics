import path from "node:path";
import { fileURLToPath } from "node:url";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "node:http";
import "./files/c.cjs";

const random = Math.random();

let unknownObject;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (random > 0.5) {
  // Using newer JSON import syntax
  const moduleA = await import("./files/a.json", { with: { type: "json" } });
  unknownObject = moduleA.default;
} else {
  const moduleB = await import("./files/b.json", { with: { type: "json" } });
  unknownObject = moduleB.default;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
