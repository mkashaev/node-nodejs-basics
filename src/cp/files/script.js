/*
This function should create IPC-channel between stdin and stdout of
master process and child process:
child process stdin should receive input from master process stdin
child process stdout should send data to master process stdout
*/

const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.includes("CLOSE")) process.exit(0);
  process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
};

process.stdin.on("data", echoInput);
