/*
implement function that reads data from process.stdin,
reverses text using Transform Stream and then writes it into process.stdout
*/
import { Transform } from "node:stream";
import { stdin, stdout } from "node:process";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, _, callback) {
      const reversedChunk =
        chunk.toString().split("").reverse().join("") + "\n";
      callback(null, reversedChunk);
    },
  });

  stdin.pipe(reverseTransform).pipe(stdout);
};

await transform();
